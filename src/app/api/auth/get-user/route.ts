import { auth } from "@/auth";
import { client } from "@/lib/mongo";

export async function GET(request: Request) {
        
        // Extract session to get the email
        const session = await auth()

        if (!session || !session.user || !session.user.email) {
            throw new Error("Unable to retrieve user session or email.");
        }

        const userEmail = session.user.email;

        // Connect to MongoDB + config to get working with DailySAT db 
        await client.connect();
        const db = client.db("DailySAT");
        const usersCollection = db.collection("users");

        // Check if the email exists in the database
        const existingUser = await usersCollection.findOne({ email: userEmail });

        return Response.json({
            result: "Retrieved user",
            user: existingUser,
        })
}
