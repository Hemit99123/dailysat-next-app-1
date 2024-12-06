import client from "@/lib/mongo";
import { Db, Document } from "mongodb";

export async function GET(request: Request) {
    const url: URL = new URL(request.url);
    const searchParams: URLSearchParams = new URLSearchParams(url.search);
    const email: string = searchParams.get("email") || "";
  
    // Check if the topic query parameter is provided
    if (email === "") {
      return Response.json({
        code: 400,
        error: "no email parameter specified",
      });
    } else {
      try {
        await client.connect();
        const db: Db = client.db("DailySAT");
        const doc = db
          .collection("authorized-employees")
          .aggregate([{ $match: { email } }, { $sample: { size: 1 } }]);
  
        const doc_array: Document[] = await doc.toArray();
  
        // Return the result with the question document
        return Response.json({ doc_array });
      } catch (error) {
        // Handle any database errors
        return Response.json({
          code: 500,
          error: "Internal server error",
          errorMsg: error
        });
      }
    }
  }
  