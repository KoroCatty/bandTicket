import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true); // クエリの厳密モードを有効にする

  // if DB is already connected, do not connect again
  if (connected) {
    console.log("MongoDB is already connected 🚫");
    return;
  }

  // connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
    console.log("MongoDB connected 🚀");
  } catch (error) {
    console.log("MongoDB connection error 🔥:", error);
  }
};
export default connectDB;
