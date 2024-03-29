import mongoose from "mongoose";

//schema design
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required and should be unique"],
        unique: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["farmer", "company"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
}, { timestamps: true });

//export
const userModel = mongoose.model("users", userSchema);
export default userModel;