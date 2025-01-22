import { getQuestion } from "../../../../lib/mongo";

export const GET = async (request: Request) => {
  const question = await getQuestion(request, "questions-math")

  return question
}
