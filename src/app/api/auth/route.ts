import { client } from "@/lib/mongo";
import { Db, Document, InsertOneResult, ObjectId, WithId } from "mongodb";
import { createClient } from "@/lib/supabase";

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: User signup or login
 *     description: Signs up a new user or logs in an existing user based on the provided email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the user.
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Successfully signed up or logged in the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: "signup" or "login"
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     _id:
 *                       type: string
 *                       example: "60d0fe4f5311236168a109ca"
 *                 ts:
 *                   type: string
 *                   example: "1625077765000"
 *       400:
 *         description: Bad request due to improper input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Invalid request JSON format."
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error."
 */

export async function POST(request: Request) {
  try {
    const supabase = createClient();

    // Authenticate user with Google OAuth
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "/",
      },
    });

    if (error) {
      return new Response(JSON.stringify({
        code: 400,
        message: "Error during authentication."
      }), { status: 400 });
    }

    // Get user information after login
    const { data: authData, error: userError } = await supabase.auth.getUser();

    if (userError || !authData?.user) {
      return new Response(JSON.stringify({
        code: 400,
        message: "Failed to retrieve user information."
      }), { status: 400 });
    }

    await client.connect();
    const db: Db = client.db("DailySAT");

    // Check if user exists in MongoDB
    const existingUser: WithId<Document> | null = await db.collection("users").findOne({ email: authData.user.email });

    if (!existingUser) {
      // Create a new user document
      
      const { username, birthday } = await request.json()

      const newUser: InsertOneResult<Document> = await db.collection("users").insertOne({
        email: authData.user.email,
        username,
        birthday,
        currency: 0,
        questionsAnswered: [],
        _id: new ObjectId(authData.user.id),
      });

      if (newUser.acknowledged) {
        return new Response(JSON.stringify({
          code: 200,
          status: "signup",
          user: authData.user,
          ts: Date.now().toString(),
        }), { status: 200 });
      } else {
        throw new Error("Failed to create new user document.");
      }
    }

    // User exists, return login response
    return new Response(JSON.stringify({
      code: 200,
      status: "login",
      email: authData.user.email,
      ts: Date.now().toString(),
    }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({
      code: 500,
      message: "Internal server error."
    }), { status: 500 });
  }
}
