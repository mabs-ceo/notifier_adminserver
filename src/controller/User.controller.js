// const User = require("../models/User.model");

// async function registerUser(req, res) {
//     const { username, email,role } = req.body;

//     if (!username || !email || !role) {
//         return res.status(400).json({
//             status: "fail",
//             code: 400,
//             message: "Bad Request. Please check your input."
//           });
//     }

//     try {
       
//         const user = new User({
//             username,
//             email,
//             role
        
//         });

//         await user.save();
//         res.status(201).json({
//             status: "success",
//             code: 201,
//             data: user
//           });
//     } catch (error) {
//         res.status(500).json( {
//             status: "error",
//             code: 500,
//             message: "Internal Server Error. Something went wrong on our end."
//           });
//     }
// }

// module.exports = {
//     registerUser
// };

const User = require("../models/User.model");

async function registerUser(req, res) {
  const { username, email, role } = req.body;

  // Validate input fields
  if (!username || !email || !role) {
    return res.status(400).json({
      status: "fail",
      code: 400,
      message: "All fields (username, email, role) are required."
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        status: "fail",
        code: 409,
        message: "A user with this email already exists."
      });
    }

    // Create and save new user
    const newUser = new User({ username, email, role });
    await newUser.save();

    res.status(201).json({
      status: "success",
      code: 201,
      data: newUser
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Internal Server Error. Could not register user."
    });
  }
}

module.exports = {
  registerUser
};
