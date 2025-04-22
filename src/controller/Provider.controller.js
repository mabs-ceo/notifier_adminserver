// const Provider = require("../models/Provider.model");

// async function getAllProviders(req, res) {
//   try {
//     const providers = await Provider.find();
//     res.status(200).json({
//       status: "success",
//       code: 200,
//       data: providers
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       message: "Internal Server Error. Something went wrong on our end."
//     });
//   }
// }

// async function createProvider(req, res) {
//   const provider = new Provider({
//     name: req.body.name,
//     email: req.body.email,
//     uen: req.body.uen,
//     contact: req.body.contact,
//     postal: req.body.postal,
//     providedCount: req.body.providedCount,
//   });

//   try {
//     const newProvider = await provider.save();
//     res.status(201).json(  {
//       status: "success",
//       code: 201,
//       data: newProvider
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       message: "Internal Server Error. Something went wrong on our end."
//     });
//   }
// }

// async function updateProvider(req, res) {
//   const {id}=req.params
//   if(!id){
//     return res.status(404).json({
//       status: "fail",
//       code: 400,
//       message: "Not Found. Id is required."
//     });
//   }
 
//   try {
//     const provider = await Provider.findById(id);
//     if (!provider) {
//       return res.status(404).json({
//         status: "fail",
//         code: 404,
//         message: "Not Found. The requested resource doesn't exist."
//       });
//     }
//     const {name,email,uen,contact,postal}= req.body
//     if(!name &&!email&&!contact&&!postal){
//      return res.status(400).json({
//         status: "fail",
//         code: 400,
//         message: "Bad Request. Please check your input."
//       });
//     }
//     if(name && name !== provider.name){
//       provider.name = name
//     }

//     if(email && email !== provider.email){
//       provider.email = email
//     }
//     if(uen && uen !== provider.uen){
//       provider.uen = uen
//     }
//     if(contact && contact !== provider.contact){
//       provider.contact = contact
//     }
   
//     if(postal && postal !== provider.postal){
//       provider.postal = postal
//     }
   
   
    
  

//     const updatedProvider = await provider.save();
//     res.status(200).json( {
//       status: "success",
//       code: 201,
//       data: updatedProvider
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       message: "Internal Server Error. Something went wrong on our end."
//     });
//   }
// }

// async function deleteProvider(req, res) {
//   const {id}=req.params
//   try {
//     const provider = await Provider.findByIdAndDelete(id);
//     if (provider !== null) {
//       return res.status(404).json({
//         status: "fail",
//         code: 404,
//         message: "Not Found. The requested resource doesn't exist."
//       });
//     }

    
//     res.status(204).json({
//       status: "success",
//       code: 204,
//       message: "No content"
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: "error",
//       code: 500,
//       message: "Internal Server Error. Something went wrong on our end."
//     });
//   }
// }


// module.exports = {
//   getAllProviders,
//   createProvider,
//   updateProvider,
//   deleteProvider,
// };


const Provider = require("../models/Provider.model");

async function getAllProviders(req, res) {
  try {
    const providers = await Provider.find();
    res.status(200).json({
      status: "success",
      code: 200,
      data: providers
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error. Something went wrong on our end."
    });
  }
}

async function createProvider(req, res) {
  const provider = new Provider({
    name: req.body.name,
    email: req.body.email,
    uen: req.body.uen,
    contact: req.body.contact,
    postal: req.body.postal,

  });

  try {
    const newProvider = await provider.save();
    res.status(201).json(  {
      status: "success",
      code: 201,
      data: newProvider
    });
    console.log(newProvider)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error. Something went wrong on our end."
    });
  }
}

async function updateProvider(req, res) {
  const {id}=req.params
  if(!id){
    return res.status(404).json({
      status: "fail",
      code: 400,
      message: "Not Found. Id is required."
    });
  }
 
  try {
    const provider = await Provider.findById(id);
    if (!provider) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        message: "Not Found. The requested resource doesn't exist."
      });
    }
    const {name,email,uen,contact,postal}= req.body
    if(!name &&!email&&!contact&&!postal){
     return res.status(400).json({
        status: "fail",
        code: 400,
        message: "Bad Request. Please check your input."
      });
    }
    if(name && name !== provider.name){
      provider.name = name
    }

    if(email && email !== provider.email){
      provider.email = email
    }
    if(uen && uen !== provider.uen){
      provider.uen = uen
    }
    if(contact && contact !== provider.contact){
      provider.contact = contact
    }
   
    if(postal && postal !== provider.postal){
      provider.postal = postal
    }
   
   
    
  

    const updatedProvider = await provider.save();
    res.status(200).json( {
      status: "success",
      code: 201,
      data: updatedProvider
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error. Something went wrong on our end."
    });
  }
}

async function deleteProvider(req, res) {
  const {id}=req.params

  try {
    const provider = await Provider.findByIdAndDelete(id);
    if (provider === null) {
      return res.status(404).json({
        status: "fail",
        code: 404,
        message: "Not Found. The requested resource doesn't exist."
      });
    }

    
  return  res.status(204).json({
      status: "success",
      code: 204,
      message: "No content"
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error. Something went wrong on our end."
    });
  }
}


module.exports = {
  getAllProviders,
  createProvider,
  updateProvider,
  deleteProvider,
};