// const admin = require("../configs/firebase.config")

// async function sendToMultipleTokens(tokens){



// try {
//     const message = {
//       notification: {
//         title: "Janazah Alert",
//         body: "There is a new Janazah prayer update.",
//       },    
//       tokens: tokens, // Replace with actual tokens
//     };
  
//     const response = await admin.messaging().sendEachForMulticast(message);
  
//     // console.log(`✅ ${response.successCount} messages sent, ❌ ${response.failureCount} failed`);
  
//     response.responses.forEach((res, idx) => {
//       if (!res.success) {
//         console.error(`❌ Token ${message.tokens[idx]} failed:`, res.error.message);
//       }
//     });
  
//   } catch (error) {
//     console.error("🔥 Fatal error while sending FCM messages:", error.message);
//   }
       
// }


// module.exports={sendToMultipleTokens}


const admin = require("../configs/firebase.config");

async function sendToMultipleTokens(tokens) {
  const MAX_TOKENS_PER_BATCH = 500;

  try {
    // Split tokens into chunks of 500
    for (let i = 0; i < tokens.length; i += MAX_TOKENS_PER_BATCH) {
      const tokenBatch = tokens.slice(i, i + MAX_TOKENS_PER_BATCH);

      const message = {
        notification: {
          title: "Janazah Alert",
          body: "There is a new Janazah prayer update.",
        },
        tokens: tokenBatch,
      };

      const response = await admin.messaging().sendEachForMulticast(message);

      console.log(`✅ Batch ${i / MAX_TOKENS_PER_BATCH + 1}: ${response.successCount} sent, ❌ ${response.failureCount} failed`);

      response.responses.forEach((res, idx) => {
        if (!res.success) {
          console.error(`❌ Token ${tokenBatch[idx]} failed:`, res.error.message);
        }
      });
    }
  } catch (error) {
    console.error("🔥 Fatal error while sending FCM messages:", error.message);
  }
}

module.exports = { sendToMultipleTokens };
