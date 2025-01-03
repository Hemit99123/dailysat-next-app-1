import { auth } from "@/auth";
import { client } from "@/lib/mongo";
export async function POST(request: Request) {
        
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

        if (!existingUser) {
            // Add the user to the database if they don't exist
            const newUser = {
                email: userEmail,
                name: session.user.name,
                image: session.user.image,
                id: session.user.id,
                currency: 0,
                questionsAnswered: []
            };
            await usersCollection.insertOne(newUser);
        }

        return new Response(
            JSON.stringify({
                result: "Success",
                email: userEmail,
                message: existingUser ? "User exists" : "New user added",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
}
