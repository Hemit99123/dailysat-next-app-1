import { QUESTION_IS_CORRECT_POINTS } from "@/lib/CONSTANTS";
import { client } from "@/lib/mongo";
import { Collection, Db, Document } from "mongodb";

export async function POST(request: Request) {
  const {email, question, state, userAnswer} = await request.json();

  // Check if the id query parameter is provided
  if (email === "" || question === null || state === "" || userAnswer === "") {
    return Response.json({
      code: 400,
      error: "a paramater was not specified", // Adjusted to 400 since it's a client-side error
    });
  } else {
    try {
      await client.connect();
      const db: Db = client.db("DailySAT");
      const coll: Collection<Document> = db.collection("users");
      
      // Insert the new bug ID into the database
      await coll.updateOne({"email" : email},{ $inc : {currency : state === 1 ? QUESTION_IS_CORRECT_POINTS : 0}, $addToSet : {questionsAnswered : {...question, correct : state, toc : Date.now(), userAnswer : userAnswer}} });
      client.close();

      // Return a success response with the inserted result
      return Response.json({
        result: "DONE",
      });
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
