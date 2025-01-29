import { auth } from "@/auth";
import { client } from "@/lib/mongo";
import { Collection, Db, Document } from "mongodb";
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
        const result = await user.findOneAndUpdate(
            { email, enrolledSchool: { $ne: school } }, // Only update if school is different
            { $set: { enrolledSchool: school } },
            { returnDocument: "after" }  // Optionally return the updated document
        );

        // Check if the update was performed
        if (!result?.value) {
            // This means the enrolledSchool was already the same or the user was not found
            if (result?.lastErrorObject.n === 0) {
                throw new Error("School already enrolled or user not found");
            }
            throw new Error("Failed to update school enrollment");
        }

        // Add the user to the school's students array
        const schoolResult = await school_collection.findOneAndUpdate(
            { _id: school }, // Assuming `school` is the schoolID or _id of the school document
            {
                $addToSet: { students: email } // Using $addToSet to avoid duplicate emails in the students array (sets cannot take duplicates)
            },
            { returnDocument: "after" }  // Optionally return the updated school document
        );

        // Check if the school update was successful
        if (!schoolResult?.value) {
            throw new Error("Failed to add user to school students");
        }

        // Success response
        return NextResponse.json({ success: true, message: "School enrollment updated and student added to school" });

    } catch (error) {
        console.error("Error updating school enrollment:", error);
        throw new Error("Failed to update school enrollment and add student to school");
    } finally {
        await client.close();
    }
};
