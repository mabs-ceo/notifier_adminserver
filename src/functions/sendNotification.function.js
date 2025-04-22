const admin = require("../configs/firebase.config")

async function sendToMultipleTokens(tokens){

console.log('send Notification function')
console.log(tokens)

try {
    const message = {
      notification: {
        title: "Janazah Alert",
        body: "There is a new Janazah prayer update.",
      },
      data: {
        click_action: "https://google.com", // Your target URL
      },
      tokens: tokens, // Replace with actual tokens
    };
  
    const response = await admin.messaging().sendEachForMulticast(message);
  
    console.log(`✅ ${response.successCount} messages sent, ❌ ${response.failureCount} failed`);
  
    response.responses.forEach((res, idx) => {
      if (!res.success) {
        console.error(`❌ Token ${message.tokens[idx]} failed:`, res.error.message);
      }
    });
  
  } catch (error) {
    console.error("🔥 Fatal error while sending FCM messages:", error.message);
  }
       
}


module.exports={sendToMultipleTokens}