import client from "../../../lib/mongo";
import { Db, Document, InsertOneResult, ObjectId, WithId } from "mongodb";
import { User } from "@/app/signup/page";

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
