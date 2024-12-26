import { client }   from "@/lib/mongo";
import { Db, WithId, Document, FindCursor } from "mongodb";

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
                points: allValues[0].currency
            })
        }
        catch {
            return Response.json({
                code: 500,
                message: "database error"
            });
        }
    }
}