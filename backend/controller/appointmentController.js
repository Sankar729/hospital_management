import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";

import {  ErrorHandler,  errorMiddleware } from "../middlewares/errorMiddleware.js";



export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address,
    } = req.body;

    // Check if all required fields are present in the request body
    if (!firstName || !lastName || !email || !phone || !nic || !dob || !gender || !appointment_date || !department || !doctor_firstName || !doctor_lastName || hasVisited === undefined || !address) {
        return next(new errorMiddleware("Please fill out the entire form", 400));
    }

    // Find the doctor
    const doctor = await User.findOne({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartment: department
    });

    // Check if doctor is found
    if (!doctor) {
        return next(new errorMiddleware("Doctor not found", 400));
    }

    // Create the appointment
    const appointment = await Appointment.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointment_date,
        department,
        doctor: {
            firstName: doctor_firstName,
            lastName: doctor_lastName,
        },
        hasVisited,
        address,
        doctorId: doctor._id,
        patientId: req.user._id
    });

    res.status(200).json({
        success: true,
        message: "Appointment sent successfully",
        appointment
    });
});
