const { MongoClient, ServerApiVersion } = require("mongodb");
const { readFileSync } = require("node:fs");

// Load in Questions from JSON
let questions;
try {
  questions = JSON.parse(readFileSync('mathQuestions.json', 'utf8'));
} catch (e) {
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const uri =
  "mongodb+srv://ljain1234512345:wVb75LLJSXnkQtBe@dailysat.rbxoj.mongodb.net/?retryWrites=true&w=majority&appName=DailySAT";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const addQuestions = async() => {
    try {
        // Connect
        await client.connect();
        console.log("client connected")

        // Looping variables
          let idx = 0;
          let nArray_local = [];

        //   Loop
          for (const l in questions) {

            // Push question.
            // NOTE : DOC_TYpe represents the JSON file we're loading it in from.
              nArray_local.push({...questions[l],"doc_type" : 3});

              idx += 1
              if (idx >= 10) {
                
                // Insert Docs in Batches of 10 to minimize overhead.
                idx = 0;
                const db = client.db("DailySAT");
                const coll = db.collection("questions");
                const result = await coll.insertMany(nArray_local);

                // display the results of the operation (FOR DEBUG)
                console.log(result.insertedIds);

                // Reset the array
                nArray_local = []
              }
            }
      } finally {
        // Ensures that the client closes when the program finish/error
        await client.close();
      }
}

addQuestions()