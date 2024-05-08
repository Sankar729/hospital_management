import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const userSchema = new Schema({
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
    nic: {
        type: String,
        required: true,
        minlength: [10, "NIC number must contain exactly 10 numbers"],
        maxlength: [10, "NIC number must contain exactly 10 numbers"],
    },
    dob:{
        type:Date,
        required:[true, "DOB is required"],
    },
    gender:{
        type: String,
        required: true,
        enum:["male", "female"]
    },
    password:{
      type : String,
      minlength:[11, "Password must contain at least 11 characters"],
      required:true,
      select:false
    },
    role:{
        type:String,
        required :true,
        enum: ["Admin", "Patient","Doctor" ],
    },
    doctorDepartment:{
        type:String
    },
    doctorAvatar:{
        public_id: String,
        url:String,
    },
});

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next();
    }
    this.password =  await bcrypt.hash(this.password,10);
});

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken= function(){
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
};

export const User = mongoose.model("User", userSchema);
