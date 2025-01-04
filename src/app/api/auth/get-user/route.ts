import { handleGetUser } from "@/lib/auth/getUser";

export async function POST() {
    const existingUser = await handleGetUser()

    return Response.json({
        result: "Success",
        user: existingUser,
    })
}