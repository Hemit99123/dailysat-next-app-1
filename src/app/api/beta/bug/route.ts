import client from "../../../../lib/mongo";
import { Collection, Db, Document, InsertOneResult } from "mongodb";

export async function GET(request: Request) {
  const url: URL = new URL(request.url);
  const searchParams: URLSearchParams = new URLSearchParams(url.search);
  const id: string = searchParams.get("id") || "";
  if (id == "") {
    return Response.json({
      code: 500,
      error: "no id parameter specified",
    });
  } else {
    await client.connect();
    const db: Db = client.db("DailySAT");
    const coll: Collection<Document> = db.collection("bugged");
    const result : InsertOneResult<Document> = await coll.insertOne({"id":id});
    console.log(result)
    return Response.json({ result });
  }
}
