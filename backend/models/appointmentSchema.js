import mongoose from "mongoose"; 
import validator from "validator";

const appointmentSchema = new Schema({
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
    appointment_date:{
        type: String,
        required : true,
    },
    department:{
        type: String,
        required : true,

    },
    doctor:{
        firstName:{
            type: String,
        required : true,
        },
        lastName:{
            type: String,
        required : true,
        }
    },
    hasVisited:{
        type:Boolean,
        default: false,
    },
    doctorId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    patientId:{
        type: mongoose.Schema.ObjectId,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    status:{
        type:String,
        enum:["Pending","Accepted", "Rejected"],
        default:"Pending",
    },

   
});
export const Appointment = mongoose.model("Appointment", appointmentSchema);
