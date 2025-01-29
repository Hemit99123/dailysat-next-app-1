import { auth } from "@/auth";
import { client } from "@/lib/mongo";
import { Collection, Db, Document, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const school = body.schoolID;

    // Check if schoolID is provided in the request
    if (!school) {
        throw new Error("schoolID is required");
    }

    // Get the authenticated user email
    const session = await auth();
    const email: string | null | undefined = session?.user?.email;

    if (!email) {
        throw new Error("User not authenticated");
    }

    try {
        await client.connect();
        const db: Db = client.db("DailySAT");
        const user: Collection<Document> = db.collection("users");
        const school_collection: Collection<Document> = db.collection("schools");

        // Proceed with the update if schoolID is different
        await user.findOneAndUpdate(
            { email, enrolledSchool: { $ne: school } }, // Only update if school is different
            { $set: { enrolledSchool: school } },
            { returnDocument: "after" }  // Optionally return the updated document
        );

        // Add the user to the school's students array
        await school_collection.findOneAndUpdate(
            { _id: new ObjectId(school) }, // Assuming `school` is the schoolID or _id of the school document
            {
                $addToSet: { students: email } // Using $addToSet to avoid duplicate emails in the students array (sets cannot take duplicates)
            },
            { returnDocument: "after" }  // Optionally return the updated school document
        );


        // Success response
        return NextResponse.json({ success: true, message: "School enrollment updated and student added to school" });

    } catch (error) {
        console.error("Error updating school enrollment:", error);
        throw new Error("Failed to update school enrollment and add student to school");
    } finally {
        await client.close();
    }
};
