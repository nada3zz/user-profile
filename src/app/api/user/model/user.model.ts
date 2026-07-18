import mongoose, { Schema} from "mongoose";
import { IUser } from "../interface/user.interface";


const UserSchema: Schema = new Schema(
    {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: false },
    userType: { type: String, required: true}
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);

