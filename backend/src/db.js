import mongoose from "mongoose";

const connectDB = async () => {
    // MongoDB connection
    mongoose
    .connect("mongodb://127.0.0.1:27017/dropbox_demo")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;
