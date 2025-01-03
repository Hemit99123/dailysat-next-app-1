import { client } from "@/lib/mongo";
import { Db, InsertOneResult, ObjectId } from "mongodb";

export async function POST(request: Request) {
  try {
    await client.connect();
    const db: Db = client.db("DailySAT");

    const { email, username, birthday } = await request.json();

    if (!email || !username || !birthday) {
      return new Response(
        JSON.stringify({
          code: 400,
          message: "Email, username, and birthday are required.",
        }),
        { status: 400 }
      );
    }

    const newUser: InsertOneResult = await db.collection("users").insertOne({
      email,
      username,
      birthday,
      currency: 0,
      questionsAnswered: [],
      _id: new ObjectId(),
    });

    if (!newUser.acknowledged) {
      throw new Error("Failed to create a new user document.");
    }

    return new Response(
      JSON.stringify({
        code: 200,
        message: "User created successfully.",
        user: { email, username, birthday },
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ code: 500, message: "Internal server error." }),
      { status: 500 }
    );
  }
}
