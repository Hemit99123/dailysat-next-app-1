const SymSpell = require("node-symspell");
const { MongoClient, ServerApiVersion } = require("mongodb");
import questions from "dailysat\src\data\questions2.json" with { type: "json" };

const uri =
  "mongodb+srv://ljain1234512345:wVb75LLJSXnkQtBe@dailysat.rbxoj.mongodb.net/?retryWrites=true&w=majority&appName=DailySAT";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const whole = async() => {
    try {
        await client.connect();
        console.log("client connected")
        // database and collection code goes here
      
        async function fun(thingy) {
          const maxEditDistance = 2;
          const prefixLength = 7;
          const symSpell = new SymSpell(maxEditDistance, prefixLength);
          await symSpell.loadDictionary("frequency_dictionary_en_82_765.txt", 0, 1);
          await symSpell.loadBigramDictionary(
            "frequency_dictionary_en_82_765.txt",
            0,
            2
          );
      
          const typo = thingy.question
            .replaceAll(",", "")
            .replaceAll("_", "")
            .replaceAll("’", "'")
            .replaceAll(".", "")
            .replaceAll("1", "")
            .replaceAll("2", "")
            .replaceAll("3", "")
            .replaceAll("4", "")
            .replaceAll("5", "")
            .replaceAll("6", "")
            .replaceAll("7", "")
            .replaceAll("8", "")
            .replaceAll("9", "")
            .replaceAll("0", "")
            .replaceAll(":", "")
            .replaceAll("?", "")
            .replaceAll("“", "")
            .replaceAll("”", "");
          const results = symSpell.lookupCompound(typo, maxEditDistance);
      
          const len = typo.split(" ").length;
          const score = results[0].distance / len;
          console.log(
            "Score for " + thingy.question + " .... = " + score.toString()
          );
          // {
          // 	term: 'can you read this message despite the horrible spelling mistakes',
          // 	distance: 10,
          // 	count: 0
          // }
          if (score < 0.3) {
            return true;
          }
          return false;
        }
      
        async function func() {
          let idx = 0;
          let nArray_local = [];
          for (const l in questions) {
            const answer = await fun(questions[l]);
            if (answer === true) {
              nArray_local.push(questions[l]);
              idx += 1
              if (idx >= 10) {
                //
                idx = 0;
                const db = client.db("DailySAT");
                const coll = db.collection("questions");
                const result = await coll.insertMany(nArray_local);
                // display the results of the operation
                console.log(result.insertedIds);
                nArray_local = []
              }
            }
          }
        }
        func();
      } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
}

whole()