import { MongoClient, ServerApiVersion } from "mongodb";
import { Db, Document } from "mongodb";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client: MongoClient = new MongoClient(process.env.NEXT_PUBLIC_MONGO_URL  || "0" , {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const getQuestion = async (request: Request, questionCollection: string) => {
  const url: URL = new URL(request.url);
  const searchParams: URLSearchParams = new URLSearchParams(url.search);
  const topic: string = searchParams.get("topic") || "";

  // Check if the topic query parameter is provided
  if (topic === "") {
    return Response.json({
      code: 400,
      error: "no topic parameter specified", // Adjusted to 400 for client-side error
    });
  } else {
    try {
      await client.connect();
      const db: Db = client.db("DailySAT");
      const doc = db
        .collection(questionCollection)
        .aggregate([{ $match: { skill: topic } }, { $sample: { size: 1 } }]);

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