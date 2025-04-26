// const { postalSeach } = require("../functions/postal.function");
// const Notification = require("../models/Notification.model");
// const Provider = require("../models/Provider.model");
// const Token = require("../models/Tokens.model");
// const { SendNotification } = require("./SendNotification.controller");

// async function getAllStatus (req,res){
//     try{
//         const tokens = await Token.find().countDocuments();
//         const reslut ={notification: tokens, email:0};

//         res.status(200).json({
//             status: "success",
//             code: 200,
//             data: reslut
//           });
//     }catch(error){
//         res.status(500).json( {
//             status: "error",
//             code: 500,
//             message: "Internal Server Error. Something went wrong on our end."
//           });
//     }
// }
// async function getAllNotification (req,res){
//     try{
//         const notifications = await Notification.find()
        
//         res.status(200).json({
//             status: "success",
//             code: 200,
//             data: notifications
//           });
//     }catch(error){
//         res.status(500).json( {
//             status: "error",
//             code: 500,
//             message: "Internal Server Error. Something went wrong on our end."
//           });
//     }
// }

// async function createNotification (req,res){
//     console.log(req.body)
//     const currentDate = new Date();
//     const {providerId,name,postal,dueDate}=req.body


// if(!providerId|| !name|| !postal || !dueDate) {
//     return res.status(400).json({
//         status: "fail",
//         code: 400,
//         message: "Please fill all the fields"
//       });
// }
// // dueDate should always be greater then current date
// // dueDate should be in the future
// if( new Date(dueDate) < currentDate) {   
//     return res.status(400).json({message:"Please select a valid date"});
// }
// const providerDetails = await Provider.findById(providerId);
 
// if(!providerDetails) {
//     return res.status(422).json({
//         status: "fail",
//         code: 422,
//         message: "Unprocessable Entity. Validation failed."
//       });
//     }
//     const address =await postalSeach(postal)

//     try{
//         const notification = new Notification({
//             providerId: providerId,
//             providerName: providerDetails.name,
//             name: name,
//             postal: postal,
//             address:address,
//             contact: providerDetails.contact,
//             dueDate: dueDate,

//         });
//         const newNotification = await notification.save();
//         providerDetails.providedCount= providerDetails.providedCount +1
        
//        await SendNotification()
    
//         await providerDetails.save()
//         res.status(201).json( {
//             status: "success",
//             code: 201,
//             data: newNotification
//           });
//     }catch(error){
//         res.status(400).json({
//             status: "fail",
//             code: 400,
//             message: "Bad Request. Please check your input."
//           });
//     }
// }

// async function deleteNotification (req,res){
   
//     const {id} = req.params
    
//     if(!id){
//         return res.status(400).json({
//             status: "fail",
//             code: 400,
//             message: "Bad Request. Notification ID is required."
//           });
//     }
//     try{
//         const notification = await Notification.findByIdAndDelete(id);
//         if(notification === null){
//             return res.status(404).json({
//                 status: "fail",
//                 code: 400,
//                 message: "Bad Request. Notification not found."
//               });
//         }
      
//         res.status(204).json({
//             status: "success",
//             code: 204,
//             message: "No content"
//           });
//     }catch(error){
//         res.status(500).json({message:error.message});
//     }
// }

// module.exports = {
//     getAllStatus,
//     createNotification,
//     deleteNotification,
//     getAllNotification
// };
const { postalSeach } = require("../functions/postal.function");
const Notification = require("../models/Notification.model");
const Provider = require("../models/Provider.model");
const Token = require("../models/Tokens.model");
const { SendNotification } = require("./SendNotification.controller");

// Utility to handle server error consistently
const serverError = (res, error) => {
  console.error(error);
  return res.status(500).json({
    status: "error",
    code: 500,
    message: "Internal Server Error. Something went wrong on our end.",
  });
};

async function getAllStatus(req, res) {
  try {
    const tokenCount = await Token.countDocuments();
    const result = { notification: tokenCount, email: 0 };

    res.status(200).json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    return serverError(res, error);
  }
}

async function getAllNotification(req, res) {
  try {
    const notifications = await Notification.find().sort({ dueDate: -1 });

    res.status(200).json({
      status: "success",
      code: 200,
      data: notifications,
    });
  } catch (error) {
    return serverError(res, error);
  }
}

async function createNotification(req, res) {
  const currentDate = new Date();
  const { providerId, name, postal, dueDate,isShow } = req.body;

  // Validate input
  if (isShow === true && (!providerId || !name || !postal || !dueDate ) ) {
    
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "All fields (providerId, name, postal, dueDate) are required.",
    });
  }
  if (!isShow && !(providerId || !name  || !dueDate)  ) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "All fields (providerId, name, dueDate) are required.",
    });
  }

  const parsedDueDate = new Date(dueDate);
  if (parsedDueDate <= currentDate) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "Due date must be in the future.",
    });
  }

  try {
    const providerDetails = await Provider.findById(providerId);
    if (!providerDetails) {
      return res.status(422).json({
        status: "fail",
        code: 422,
        message: "Invalid provider ID. Provider not found.",
      });
    }

    let address = ''
    if(isShow){

      address= await postalSeach(postal);
    }else{
      address= 'Request privacy'
    }

    const notification = new Notification({
      providerId,
      providerName: providerDetails.name,
      name,
      postal,
      address,
      contact: providerDetails.contact,
      dueDate: parsedDueDate,
      isShow:isShow
    });
    
    const newNotification = await notification.save();

    providerDetails.providedCount += 1;
    await providerDetails.save();

    await SendNotification();

    res.status(201).json({
      status: "success",
      code: 201,
      data: newNotification,
    });
  } catch (error) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "Invalid request. Please check the input fields.",
    });
  }
}

async function deleteNotification(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "Notification ID is required.",
    });
  }

  try {
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        message: "Notification not found.",
      });
    }

    res.status(204).json({
      status: "success",
      code: 204,
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    return serverError(res, error);
  }
}

module.exports = {
  getAllStatus,
  createNotification,
  deleteNotification,
  getAllNotification,
};
