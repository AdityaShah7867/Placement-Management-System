import mongoose from "mongoose";

const placementSchema = new mongoose.Schema({
    companyName:{
        type: String,
        required: true
    },
    jobTitle:{
        type: String,
        required: true
    },
    Date:{
        type: String,
        required:true
    },
    applicants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    Branch:{
        type: String,
        default:""
    },
    salary:{
        type: String,
        default:""
    },
    type:{
        type: String,
        default:""
    
    },
    criteria:{
        type: String,
        default:""
    },
    info:{
        type: String,
        default:""
    }
},{timestamps: true});

const Placement = mongoose.model('Placement', placementSchema);
export default Placement;