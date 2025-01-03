import { client } from "@/lib/mongo";
import { createClient } from "@/lib/supabase";
import { Db } from "mongodb";

export async function POST(request: Request) {
  try {
    // Parse the request body once
    const supabase = createClient();


    await client.connect(); // You can optimize connection management
    const db: Db = client.db("DailySAT");

    try {
      // Attempt to sign in with OAuth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

    

      if (error) {
        return Response.json({ code: 400, message: `Supabase OAuth error: ${error.message}` }, { status: 400 });
      }
    } catch (error) {
      console.error("Supabase OAuth Error:", error);
      return Response.json({ code: 500, message: "OAuth sign-in failed." }, { status: 500 });
    }

    const authData = await supabase.auth.getUser()


    // Check if user exists in the database
    const existingUser = await db.collection("users").findOne({ email: authData.data.user?.email });

    if (!existingUser) {
      return Response.json({
        code: 200,
        message: "User not found.",
        state: "new_doc"
      }, { status: 200 });
    }

    // User exists, proceed with login
    return Response.json({
      code: 200,
      message: "Login successful.",
      user: existingUser,
    }, { status: 200 });

  } catch (err) {
    console.error("Server Error:", err);
    return Response.json({ code: 500, message: "Internal server error." }, { status: 500 });
  }
}
