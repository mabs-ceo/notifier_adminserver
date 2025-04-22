const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DB_URL = process.env.MONGO_URI || "mongodb+srv://admin:mniAium11021989n@notifier.iibno5u.mongodb.net/notifierDB?retryWrites=true&w=majority&appName=notifier"
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL)
        console.log("MongoDB connected")
    } catch (error) {
        console.error("MongoDB connection error:", error)
        process.exit(1)
    }
}
// async function dropIndex() {
//     try {
//       await mongoose.connect(process.env.MONGO_URI );
//       await mongoose.connection.collection('providers').dropIndex('googleId_1');
//       console.log('Index "googleId_1" dropped successfully.');
//       mongoose.disconnect();
//     } catch (err) {
//       console.error('Error dropping index:', err.message);
//     }
//   }
  
//   dropIndex();

module.exports = connectDB