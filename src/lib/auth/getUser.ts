import { auth } from "@/auth";
import { client } from "../mongo";

export const handleGetUser = async () => {
    const session = await auth()

    if (!session || !session.user || !session.user.email) {
        throw new Error("Unable to retrieve user session or email.");
    }

    const userEmail = session.user.email;
    
    await client.connect();
    const db = client.db("DailySAT");
    const usersCollection = db.collection("users");

    // Find the user
    let existingUser = await usersCollection.findOne({ email: userEmail });

    // Check if the document is null, if so create a document for the user in our mongodb records
    // This way we have a record of the user and can add user related info onto said record

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
        const result = await usersCollection.insertOne(newUser);

        // Save the newly created user so that the frontend still gets it
        
        existingUser = await usersCollection.findOne({ _id: result.insertedId });
    }

    return existingUser
}