import { auth } from "@/auth";
import { handleGetUser } from "@/lib/auth/getUser";
import { client as cacheClient } from "@/lib/performance/cache/redis";
import { handleAPiHits, handleIncreaseAPIHits } from "@/lib/performance/rate-limiter/helper/apiHits";

export async function GET() {
    const session = await auth();

    let userEmail: string | null | undefined = session?.user?.email;

    try {
        const numberHits: number = await handleAPiHits(userEmail || "");

        // Define the request limit
        const limit = 2; // Maximum allowed requests

        if (numberHits == limit) {
            // Try to fetch the user data from the cache
            let cacheData = await cacheClient.get(userEmail || "");

            // If no cached data exists, fetch it from the database and store it in the cache
            if (!cacheData) {
                const existingUser = await handleGetUser(session);

                // Prepare the user data to store in Redis
                const userData = {
                    email: existingUser?.email,
                    name: existingUser?.name,
                    currency: existingUser?.currency,
                    image: existingUser?.image,
                    _id: existingUser?._id,
                };

                // Store the user data in Redis with a 300-second expiration time
                cacheClient.set(userEmail || "", JSON.stringify(userData), "EX", 300);

                // Assign the user data to cacheData
                cacheData = JSON.stringify(userData);
            }

            // Return the cached user data
            return new Response(
                JSON.stringify({
                    result: "Success - using cache",
                    user: JSON.parse(cacheData),
                }),
                { status: 200 }
            );
        } else {
            // Otherwise, increment the number of hits and continue (no need to increment if surpassed the limit)
            await handleIncreaseAPIHits(numberHits, userEmail || "");

             // Proceed with fetching the user data
            const user = await handleGetUser(session);
            return new Response(JSON.stringify({ result: "Success", user }), { status: 200 });
        }
    } catch (error) {
        console.error("Error with rate limiting or fetching user data:", error);
        return new Response(JSON.stringify({ message: "An error occurred" }), { status: 500 });
    }
}
