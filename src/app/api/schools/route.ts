import { client } from "@/lib/mongo";
import { Collection, Db, Document } from "mongodb";

// get first 15 partnered schools

export const GET = async () => {
    try {
        await client.connect();
        const db: Db = client.db("DailySAT");
        const schools: Collection<Document> = db.collection("schools");
        const allSchools = await schools.find()
            .limit(15)
            .toArray()

        return Response.json({ success: true, data: allSchools });
    } catch (error) {
        return Response.json({ success: false, error }, { status: 500 });
    } finally {
        await client.close();
    }
};
