import { client } from "@/lib/mongo";
import { Db } from "mongodb";

export async function POST(request: Request) {
  try {
    await client.connect();
    const db: Db = client.db("DailySAT");

    const { email } = await request.json();

    if (!email) {
      return new Response(
        JSON.stringify({ code: 400, message: "Email is required." }),
        { status: 400 }
      );
    }

    // Check if user exists in the database
    const existingUser = await db.collection("users").findOne({ email });

    if (!existingUser) {
      return new Response(
        JSON.stringify({ 
          code: 200, 
          message: "User not found.", 
          state: "new_doc" 
        }),
        { status: 200 }
      );
    }

    // User exists, proceed with login
    return new Response(
      JSON.stringify({
        code: 200,
        message: "Login successful.",
        user: existingUser,
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
