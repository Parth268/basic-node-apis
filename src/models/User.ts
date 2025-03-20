import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// User Interface for Type Safety
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword(enteredPassword: string): Promise<boolean>;
}

// Define User Schema
const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
        },
    },
    { timestamps: true }
);


// Export User Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export { User, IUser };
