import client from "../../../lib/mongo";
import { Db, Document, WithId } from "mongodb";
import { FIRST_250_BONUS, REFERRAL_BONUS_REFERRED_PERSON, REFERRAL_BONUS_REFERREE } from "@/lib/CONSTANTS";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        try {
            await client.connect();

            const db: Db = client.db("DailySAT");

            // check if the referee exists
            const doc_check: WithId<Document> | null = await db.collection("users").findOne({ email: email });

            if (doc_check == null) {
                return Response.json({
                    code: 400,
                    result: 0,
                    message: "invalid email"
                })
            }
            else {
                await db.collection("users").findOneAndUpdate({ email : email}, { $inc: { currency: FIRST_250_BONUS } });

                return Response.json({
                    code: 200,
                    message: "updated"
                })
            }
        }

        catch {
            return Response.json({
                code: 500,
                message: "error in connecting with the mongodb client"
            })
        }
    }
    catch {
        return Response.json({
            code: 400,
            message: "error in reading request JSON : give  data in proper format"
        })
    }
}
