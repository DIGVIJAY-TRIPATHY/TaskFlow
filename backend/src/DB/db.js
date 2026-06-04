import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is missing in .env file");
    }

    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `✅ MongoDB Connected: ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};

export default connectDB;