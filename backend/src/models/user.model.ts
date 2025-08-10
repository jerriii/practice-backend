import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "author" | "reader";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "author", "reader"],
    default: "reader",
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>("User", UserSchema);
