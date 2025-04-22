// const { sendToMultipleTokens } = require("../functions/sendNotification.function");
// const Token = require("../models/Tokens.model")

// async function SendNotification(){

//     try {
//         const tokens= await Token.find().select("token -_id")
//         const tokenArray = tokens.map((item)=>item.token)
        
//         if(!tokens){
//             return res.status(404).json({
//                 status: "fail",
//                 code: 400,
//                 message: "Bad Request. Notification not found."
//               });
//         }
//         console.log('sending')
//         const response = await sendToMultipleTokens(tokenArray)
     
//       return   {
//             status: "success",
//             code: 201,
//             data: response
//           }
//     } catch (error) {
//        return  {
//             status: "error",
//             code: 500,
//             message: "Internal Server Error. Something went wrong on our end."
//           }
//     }
    
// }

// module.exports={SendNotification}

const { sendToMultipleTokens } = require("../functions/sendNotification.function");
const Token = require("../models/Tokens.model");

async function SendNotification() {
  try {
    const tokens = await Token.find().select("token -_id");
    const tokenArray = tokens.map((item) => item.token);

    if (!tokenArray.length) {
      console.warn("No device tokens found to send notification.");
      return {
        status: "fail",
        code: 404,
        message: "No tokens available to send notifications."
      };
    }

    console.log("Sending notifications to tokens...");
    const response = await sendToMultipleTokens(tokenArray);

    return {
      status: "success",
      code: 200,
      data: response
    };

  } catch (error) {
    console.error("Error while sending notifications:", error);
    return {
      status: "error",
      code: 500,
      message: "Internal Server Error. Unable to send notifications."
    };
  }
}

module.exports = { SendNotification };
