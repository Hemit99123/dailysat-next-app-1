// NOTE : THESE FILES ARE NOT FOR THE WEB APP. THESE ARE FEEDER SCRIPTS
const SymSpell = require("node-symspell");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  process.env.mongoURL;

// Read Questions
let questions;
try {
  questions = JSON.parse(readFileSync('initial-RW-questions.json', 'utf8'));
} catch (e) {
}

// Create a MongoClient 
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Main is wrapped in a function because it is async
const main = async() => {
    try {
        await client.connect();
        // database and collection code goes here
      
        async function is_not_bugged(question) {

          // Spell-Check the question. If the difference between the spellchecked version and the actual question is greater than some constant, the question is bugged and we discard it.
          const maxEditDistance = 2;
          const prefixLength = 7;
          const symSpell = new SymSpell(maxEditDistance, prefixLength);
          await symSpell.loadDictionary("frequency_dictionary_en_82_765.txt", 0, 1);
          await symSpell.loadBigramDictionary(
            "frequency_dictionary_en_82_765.txt",
            0,
            2
          );
      
          // Replace punctuation because symspell counts those too.
          const typo = question.question
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
      
          // Normalize the score
          const len = typo.split(" ").length;
          const score = results[0].distance / len;

          // Debug statement when running the code
          // console.log(
          //   "Score for " + question.question + " .... = " + score.toString()
          // );
          // 

          // Count the question only if the normalized score is less than this
          if (score < 0.3) {
            return true;
          }
          return false;
        }
      
        async function record_questions() {
          let idx = 0;
          let nArray_local = [];
          for (const l in questions) {
            const answer = await is_not_bugged(questions[l]);
            if (answer === true) {
              nArray_local.push(questions[l]);
              idx += 1

              // Send the results in batches of 10 to reduce time.
              if (idx >= 10) {
                //
                idx = 0;
                const db = client.db("DailySAT");
                const coll = db.collection("questions");
                
                await coll.insertMany(nArray_local);
                // display the results of the operation
                // console.log(result.insertedIds);
                nArray_local = []
              }
            }
          }
        }
        record_questions();
      } finally {
        // Ensures that the client closes when we finish/error
        await client.close();
      }
}

main()