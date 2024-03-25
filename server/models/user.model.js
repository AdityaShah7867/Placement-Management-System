import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    Branch:{
        type: String,
        default: "",
    },
    applications: [
        {
            type:String,
            default:""
        }
    ],
    year:{
        type: String,
        required: true
    },
    rollno:{
        type: String,
        required: true
    },
    resume: {
        filename: String,
        contentType: String,
        data: Buffer
    }

},{timestamps: true});


const User = mongoose.model('User', userSchema);    
export default User;