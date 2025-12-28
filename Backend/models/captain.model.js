import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

const captainSchema = new mongoose.Schema({
    fullName : {
        firstName : {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long'],
        },
        lastName : {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, 'Please enter a valid email' ]
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status: {
        type: String,
        enum: [ 'active', 'inactive' ],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength: [ 3, 'Color must be at least 3 characters long' ],
        },
        plate: {
            type: String,
            required: true,
            minlength: [ 3, 'Plate must be at least 3 characters long' ],
        },
        capacity: {
            type: Number,
            required: true,
            min: [ 1, 'Capacity must be at least 1' ],
        },
        vehicleType: {
            type: String,
            required: true,
            enum: [ 'car', 'motorcycle', 'auto' ],
        }
    },
    location: {
        ltd: { // Latitude
            type: Number,
        },
        lng: { // longitude
            type: Number,
        }
    },
    username : {
        type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim : true,
            index : true,
    },
    contact: {
        type: String,
        required: true,
    },
    refreshToken : {
            type : String,
            select : false
    }

},{timestamps : true})

captainSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

captainSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};

captainSchema.methods.generateAccessToken = function (){
    return jwt.sign(
        {
            _id : this._id,
            fullName : this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

captainSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

captainSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const Captain = mongoose.model('Captain', captainSchema)