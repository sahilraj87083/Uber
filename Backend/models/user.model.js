import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
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
        lowercase : true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    contact: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    refreshToken : {
            type : String,
            select : false
    },
    socketId: {
        type: String,
    },
    
},{timestamps : true})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.statics.hashPassword = async function (password) {
    return bcrypt.hash(password, 10);
};


userSchema.methods.generateAccessToken = function (){
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

userSchema.methods.generateRefreshToken = function () {
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
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)