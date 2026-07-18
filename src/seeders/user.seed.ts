import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import userModel from "../app/api/user/model/user.model";
import { UserType } from "../app/api/user/enum";

dotenv.config();

async function seedUser() {
  try {
    
    await mongoose.connect(process.env.MONGO_URI!);

    const adminEmail = "admin@gmail.com";

    const existingAdmin = await userModel.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await userModel.create({
      fullName: "admin",
      email: adminEmail,
      password: hashedPassword,
      age: 30,
      userType: UserType.ADMIN,
    });

    console.log("Admin created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to seed admin:", error);
    process.exit(1);
  }
}

seedUser();