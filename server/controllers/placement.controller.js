import Placement from "../models/placement.model.js";
import User from "../models/user.model.js";

export const createPlacement = async (req, res) => {
    try {
        const {companyName, jobTitle, Date,Branch,salary,type,criteria,info} = req.body;
        if(!companyName || !jobTitle || !Date) return res.status(400).json({ message: "Please fill all the fields",success: false})
        const placement = await Placement.create({ companyName, jobTitle, Date,Branch,salary,type,criteria,info });
        return res.status(201).json({ placement,success: true,message: "Placement created successfully"});
    } catch (error) {
        console.log('error in createPlacement: ', error)
        return res.status(500).json({ message: error.message,success: false});
    }
}

export const getPlacements = async (req, res) => {
    try {
        const placements = await Placement.find();
        return res.status(200).json({ placements,success: true});
    } catch (error) {
        console.log('error in getPlacements: ', error)
        return res.status(500).json({ message: error.message,success: false});
    }
}

export const getPlacementWithId = async (req, res) => {
    try {
        const placement = await Placement.findById(req.params.id);
        return res.status(200).json({ placement,success: true});
    } catch (error) {
        console.log('error in getPlacementWithId: ', error)
        return res.status(500).json({ message: error.message,success: false});
    }
}

export const joinPlacement = async (req, res) => {
    try {
        const placementId = req.params.id;
        const userId = req.userId;

        const placement = await Placement.findById(placementId).populate('applicants');
        const user = await User.findById(userId);

        if(user.applications.includes(placementId)){
            return res.status(400).send({
                message:"Applied",
                success:false
            })
        }

        

        if (!placement) {
            return res.status(404).json({ message: "No placement found" });
        }

        // Check if userId is already present in the applicants array
        if (placement.applicants && placement.applicants.includes(userId)) {
            return res.status(400).json({ message: "You have already applied for this placement" });
        }

        // If userId is not present, add it to the applicants array
        if (placement.applicants) {
            placement.applicants.push(userId);
        } else {
            placement.applicants = [userId];
        }

        user.applications.push(placementId)
         await user.save()

        await placement.save();

        res.status(200).json({
            message: "You have successfully applied for the placement",
            placement
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};


export const getPlacementById = async (req, res) => {

    try {
        
        const placement = await Placement.findById(req.params.id).populate('applicants');

        if (!placement) {
            return res.status(404).json({ message: "Placement not found" });
        }
        res.status(200).json(placement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
}

export const getPlacementBYBranch=async (req,res)=>{
    try {
        const {Branch} = req.params;
        const placement = await Placement.find({Branch}) 

        if(!placement){
            return res.status(400).send({message:"Placement for your branch is not available",success:false})
        }
        return res.status(200).send({message:"Placement got",placement,success:true})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
}

