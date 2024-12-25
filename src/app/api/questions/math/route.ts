import { getQuestion } from "../../../../lib/mongo";

export async function GET(request: Request) {
  const question = await getQuestion(request, "questions-math")

  return question
}
