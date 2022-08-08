import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const ManagementSchema = new mongoose.Schema(
{
    name: {
        type: String,
    },
    lastName: {
        type: String,
        default: ''
    },
    nic: {
        type: String,
        default: ''
    },
    email: {
        type: String,
    },
    gender: {
        type: String,
        default: ''
    },
    contactNo: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
},
    { timestamps: true }
)

ManagementSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

export default mongoose.model('Management', ManagementSchema)
