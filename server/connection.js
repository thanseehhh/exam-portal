import mongoose from "mongoose"

export default function connect(){
  return mongoose.connect(process.env.DB_URI)
}


// const mongoose = require('mongoose');

// // Function to connect to MongoDB
// const connect = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//     process.exit(1); // Exit the application if the connection fails
//   }
// };

// module.exports = connect;
