import mongoose from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

const messageSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First Name must contain at least 3 characters"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last Name must contain at least 3 characters"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email address"]
    },
    phone: {
        type: String,
        required: true,
        minlength: [10, "Phone number must contain exactly 10 numbers"],
        maxlength: [10, "Phone number must contain exactly 10 numbers"]
    },
    message: {
        type: String,
        required: true,
        minlength: [10, "Message must contain at least 10 characters"]
    }
});

export const Message = mongoose.model("Message", messageSchema);
