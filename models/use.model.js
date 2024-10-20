const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9_.]+$/, "is invalid"],
            index: true,
        },
        email: {
            type: String,
            lowercase: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true,
        },
        first_name: {
            type: String,
            lowercase: true,
        },
        last_name: {
            type: String,
            lowercase: true,
        },
        dob: {
            type: Date,
            lowercase: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        is_active: {
            type: Boolean,
            lowercase: true,
        },
        phone_number: String,
        address: String,
        city: String,
        country: String,
        zipCode: String,
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        avatar: String,
        gender: String,
        createdAt: Date,
        updatedAt: Date,
        hobbies: [String],
        languages: [String],
        education: String,
        occupation: String,
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;