import { client } from "../../../lib/mongo";
import { Db, Document, WithId, ObjectId } from "mongodb";
import { REFERRAL_BONUS_REFERRED_PERSON, REFERRAL_BONUS_REFERREE } from "@/data/CONSTANTS";
import { auth } from "@/auth";

interface ReferralUpdate {
    id_referee : string
}

/**
 * @swagger
 * /api/referral:
 *   post:
 *     summary: Update referral information
 *     description: Updates the referral information for a referred person and a referee.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_referred:
 *                 type: string
 *                 description: Email of the referred person
 *               id_referee:
 *                 type: string
 *                 description: ID of the referee
 *     responses:
 *       200:
 *         description: Referral information updated successfully
 *       400:
 *         description: Invalid referral code or error in reading request JSON
 *       500:
 *         description: Error in connecting with the MongoDB client
 */

export async function POST(request: Request) {
    try{
        const body = await request.json()
        const referralCode = body.referralCode

        const session = await auth()
        const email = session?.user?.email

        try{
            await client.connect();

            const db: Db = client.db("DailySAT");

            // check if the referee exists
            const doc_check : WithId<Document> | null = await db.collection("users").findOne({_id : new ObjectId(referralCode)})

            if(doc_check == null){
                return Response.json({
                    code : 400,
                    result : 0,
                    message : "Invalid referral code"
                })
            }
            else{

                const user = await db.collection("users").findOne({email: session?.user?.email})
                
                if (user?._id == referralCode) {
                    return Response.json({
                        code : 400,
                        result : 0,
                        message : "That is your referral code"
                    })
                } else if (user?.isReferred) {
                    return Response.json({
                        code: 400,
                        result: 0,
                        message: "Already referred. Cannot perform action twice"
                    })
                }

                await db.collection("users").findOneAndUpdate({email}, {$inc : {currency : REFERRAL_BONUS_REFERRED_PERSON}});
                await db.collection("users").findOneAndUpdate({_id : new ObjectId(referralCode)}, {$inc : {currency : REFERRAL_BONUS_REFERREE}});
                
                return Response.json({
                    code : 200,
                    message : "Referral code redeemed"
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
            message : "error in reading request JSON : give referral data in proper format"
        })
    }
}
