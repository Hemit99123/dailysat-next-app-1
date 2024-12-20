// remove all of the math questons from the reading questions collection
const { MongoClient, ServerApiVersion } = require("mongodb");

// initialize client
const uri =
  "mongodb+srv://ljain1234512345:wVb75LLJSXnkQtBe@dailysat.rbxoj.mongodb.net/?retryWrites=true&w=majority&appName=DailySAT";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// query
client.db("dailySAT").collection("questions-reading").deleteMany({doc_type : 3})
