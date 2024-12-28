import { client } from "@/lib/mongo";
import { Db, WithId, Document, FindCursor } from "mongodb";

/**
 * @swagger
 * /api/user-data:
 *   get:
 *     summary: Get user data
 *     description: Retrieves user data based on the provided email.
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user
 *     responses:
 *       200:
 *         description: User data retrieved successfully
 *       400:
 *         description: Bad request. Make sure to specify the email parameter
 *       500:
 *         description: Server error
 */

export async function GET(request: Request) {
    const url: URL = new URL(request.url);
    const searchParams: URLSearchParams = new URLSearchParams(url.search);
    const userEmail: string = searchParams.get("email") || "";

    if (userEmail === "") {
        return Response.json({
            code: 400,
            message: "bad request. make sure to specify the email parameter"
        })
    }
    else {
        try {
            await client.connect();
            const db: Db = client.db("DailySAT");

            const result: FindCursor<WithId<Document>> = db.collection("users").find({ email: userEmail });
            const allValues: WithId<Document>[] = await result.toArray();
            return Response.json({
                code: 200,
                user: allValues[0]
            })
        }
        catch {
            return Response.json({
                code: 500,
                message: "Server error."
            });
        }
    }
}