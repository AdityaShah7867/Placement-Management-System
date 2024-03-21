import Placement from "../models/placement.model.js";

export const createPlacement = async (req, res) => {
    try {
        const {companyName, jobTitle, Date} = req.body;
        if(!companyName || !jobTitle || !Date) return res.status(400).json({ message: "Please fill all the fields",success: false})
        const placement = await Placement.create({ companyName, jobTitle, Date });
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
        const placement = await Placement.findById(placementId);
        if (!placement) {
            return res.status(404).json({ message: "No placement found" });
        }
        if (placement.applicants) {
            placement.applicants.push(userId);
        } else {
            placement.applicants = [userId];
        }
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