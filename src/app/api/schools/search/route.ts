import { client } from "@/lib/mongo";
import { Collection, Db, Document } from "mongodb";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get('query') || '';  // Get search query, default to empty string if not provided

    try {
        await client.connect();
        const db: Db = client.db("DailySAT");
        const schools: Collection<Document> = db.collection("schools");

        // Create a filter to match the search query in the 'name' or 'location' fields
        const filter = {
            $or: [
                { name: { $regex: searchQuery, $options: 'i' } }, // 'i' for case-insensitive search
                { location: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        // Fetch schools based on the filter
        const allSchools = await schools.find(filter).toArray();

        return Response.json({ success: true, schools: allSchools });
    } catch (error) {
        return Response.json({ success: false, error: "Failed to fetch schools" }, { status: 500 });
    } finally {
        await client.close();
    }
};
