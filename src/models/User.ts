import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

// User Interface for Type Safety
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    salt: string;
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
        salt: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.salt = salt; // Store salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare Passwords Method
UserSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export User Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export { User, IUser };
