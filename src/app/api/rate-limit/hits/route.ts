import { client } from "@/lib/middleware/rate-limiting/redis";

// Function to fetch the public IP address
async function getIpAddress() {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
}

export async function GET() {
    let ip = await getIpAddress();  // Get the IP address using the external API
    
    // Connect to Redis.
    await client.connect();

    try {
        // Ensure ip is a valid string before using it with Redis.
        if (typeof ip !== "string") {
            throw new Error("Invalid IP address");
        }

        let hits = await client.GET(ip);

        if (hits === null) {
            // Setting a new value for IP with expiration time of 300 seconds (5 minutes).
            await client.SET(ip, "0", { EX: 300 });
            hits = "0";  // Explicitly set hits to "1" after setting it.
        }

        // Ensure hits is a valid number.
        const numberHits = Number(hits);

        if (isNaN(numberHits)) {
            throw new Error("Failed to parse hits as a number");
        }

        const newHits = numberHits + 1;

        // update number of hits to new amount (this is the amount of hits next time user requests)
        await client.SET(ip, newHits.toString(), { KEEPTTL: true })


        return Response.json({
            numberHits: newHits,  // Return the updated number of hits.
        });

    } catch (error) {
        console.error("Error with rate limiting:", error);
        return Response.json({ message: "Internal Server Error", ip }, { status: 500 });
    } finally {
        // Disconnect from Redis.
        await client.disconnect();
    }
}
