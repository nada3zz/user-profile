import mongoose, { Document } from "mongoose";
import { UserType } from "../enum";

export interface IUser extends Document{
  fullName: string;
  email: string;
  password: string;
  age: number;
  userType: UserType
}
