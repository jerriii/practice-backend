import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

class Database {
  static async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log("Database connected");
    } catch (error) {
      console.log("Database Connection Failed: ", error);
      process.exit(1);
    }
  }

  static async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Database disconnected");
    } catch (error) {
      console.log("Database Disconnection Failed: ", error);
    }
  }
}

export default Database;
