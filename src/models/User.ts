import mongoose, { Document, Schema, Model } from "mongoose";

// User Interface for Type Safety
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    logStatus: boolean;
    userHashCode: string;
    isAdmin: boolean;
    authDeviceKey: string;
    userApiKey: string;
    phoneNumber:string;
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
        isActive: {
            type: Boolean,
            required: [true, "Is Active is required"],
        },
        logStatus: {
            type: Boolean,
            required: [true, "log Status is required"]
        },
        isAdmin: {
            type: Boolean,
            required: [true, "Is Admin is required"]
        },
        userHashCode: {
            type: String,
            required: [true, "Hash Code is required"]
        },
        authDeviceKey: {
            type: String,
            required: [true, "Auth Device key is required"]
        },
        phoneNumber:{
            type: String,
            required: [true, "Phone Number is required"]
        },
        userApiKey: {
            type: String,
            required: [true, "Auth Device key is required"]
        },
    },
    { timestamps: true }
);


// Export User Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export { User, IUser };
