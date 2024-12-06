import client from "@/lib/mongo";
import { Db, Document } from "mongodb";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || "";

  if (!email) {
    return new Response(
      JSON.stringify({ code: 400, error: "No email parameter specified" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await client.connect();
    const db: Db = client.db("DailySAT");
    const docCursor = db
      .collection("employees")
      .aggregate([{ $match: { email } }, { $sample: { size: 1 } }]);

    const docArray: Document[] = await docCursor.toArray();
    const result = docArray.length > 0;

    return new Response(
      JSON.stringify({ result }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database error:", error);
    return new Response(
      JSON.stringify({ code: 500, error: "Internal server error", errorMsg: error }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } finally {
    await client.close(); // Ensure the client connection is closed.
  }
}
