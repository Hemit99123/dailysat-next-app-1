import { getSession, setSession } from "@/lib/sessionManager"

export async function POST(request: Request) {
    const body = await request.json() // Await the request body
    const result = await setSession(body.email)

    const message = result ? "Session added" : "Session was NOT added" // Simplified ternary logic based on result 
    
    // Return a response with a status code and message
    return Response.json({
        result: message
    })
}

export async function GET() {
    const isSessionValid = await getSession()

    return Response.json({
        result: isSessionValid
    })
}