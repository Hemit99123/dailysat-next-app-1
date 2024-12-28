import { client } from "@/lib/mongo";
import { Db, Document, InsertOneResult, ObjectId, WithId } from "mongodb";
import { User } from "@/app/signup/page";

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
 *               _id:
 *                 type: string
 *                 description: The ID of the user.
 *                 example: "60d0fe4f5311236168a109ca"
 *               // ...other user properties...
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
 *                     // ...other user properties...
 *                 ts:
 *                   type: string
 *                   example: "1625077765000"
 *       400:
 *         description: Error in reading request JSON.
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
 *                   example: "error in reading request JSON : give userData in proper format"
 *       500:
 *         description: Error in connecting with the MongoDB client or creating document.
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
 *                   example: "error in connecting with the mongodb client" or "error in creating document, check mongoDB"
 */

export async function POST(request: Request) {
    try{
        const user : User = await request.json();

        try{
            await client.connect();

            const db: Db = client.db("DailySAT");
            const doc : WithId<Document> | null = await db.collection("users").findOne({email : user.email});

            if(doc == null){
                // Signup
                const new_doc : InsertOneResult<Document> = await db.collection("users").insertOne({...user, _id : new ObjectId(user._id)});
                if(new_doc.acknowledged == true){
                    return Response.json({
                        user : user,
                        code : 200,
                        status : "signup",
                        ts : Date.now().toString()
                    })
                }
                else{
                    return Response.json({
                        code : 500,
                        message : "error in creating document, check mongoDB"
                    })
                }
            }
            else{
                // Login
                return Response.json({
                    code : 200,
                    status : "login",
                    user : user,
                    ts : Date.now().toString()
                })
            }
        }

        catch{
            return Response.json({
                code : 500,
                message : "error in connecting with the mongodb client"
            })
        }
    }
    catch{
        return Response.json({
            code : 400,
            message : "error in reading request JSON : give userData in proper format"
        })
    }
}
