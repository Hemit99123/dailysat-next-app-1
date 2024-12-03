import client from "../../../../lib/mongo";
import { Db, Document} from "mongodb";

export async function GET(request: Request) {
  const url: URL = new URL(request.url);
  const searchParams: URLSearchParams = new URLSearchParams(url.search);
  const topic: string = searchParams.get("topic") || "";
  if (topic == "") {
    return Response.json({
      code: 500,
      error: "no topic parameter specified",
    });
  } else {
    await client.connect();
    const db: Db = client.db("DailySAT");
    const doc = db
      .collection("questions")
      .aggregate([{ $match: { skill: topic } }, { $sample: { size: 1 } }]);

    const doc_array: Document[] = await doc.toArray();
    return Response.json({ doc_array });
  }
}
