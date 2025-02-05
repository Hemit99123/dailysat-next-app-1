import { promises as fs } from 'fs';
import path from 'path';

/**
 * @swagger
 * /api/questions/math:
 *   get:
 *     summary: Retrieve a math question
 *     description: Fetches a random math question from a JSON file.
 *     responses:
 *       200:
 *         description: Successfully retrieved a math question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 question:
 *                   type: string
 *                   description: The math question retrieved from the database.
 *                 options:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Possible answer choices for the question.
 *                 correctAnswer:
 *                   type: string
 *                   description: The correct answer to the question.
 *       500:
 *         description: Internal server error due to issues retrieving the question.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   description: HTTP status code.
 *                   example: 500
 *                 error:
 *                   type: string
 *                   description: A generic error message for debugging.
 *                   example: Internal server error
 */

export const GET = async () => {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'math_questions.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const questions = JSON.parse(data);

    if (!Array.isArray(questions) || questions.length === 0) {
      return new Response(JSON.stringify({ error: 'No questions available' }), { status: 404 });
    }

    const randomIndex = Math.floor(Math.random() * questions.length);
    const doc_array = questions[randomIndex];

    return Response.json( {
      doc_array: [doc_array]
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ code: 500, error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
