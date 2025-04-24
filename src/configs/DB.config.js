const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const DB_URL = process.env.MONGO_URI 
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL)
      
    } catch (error) {
       
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
