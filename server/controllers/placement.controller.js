import Placement from "../models/placement.model.js";
import User from "../models/user.model.js";
import { Parser } from 'json2csv';


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
        const user = await User.findById(userId).populate('applications');
        console.log(user)

        if(user.applications.includes(placementId)){
            return res.status(400).send({
                message:"Already Applied",
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

        if (user.applications) {
            user.applications.push(placementId);
        } else {
            user.applications = [placementId];
        }
        await user.save()

        await placement.save();

        res.status(200).json({
            message: "You have successfully applied for the placement",
            placement,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
};


export const getApplicants = async (req, res) => {

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









export const csvDownload = async (req, res) => {
    try {
        // Retrieve placements from the database, populating the 'applicants' field with user data
        const placements = await Placement.find().populate({
            path: 'applicants',
            select: 'name email Branch year rollno', // Select specific fields from the user model
        });

        // Define fields for CSV file
        const fields = [
            { label: 'Company Name', value: 'companyName' },
            { label: 'Job Title', value: 'jobTitle' },
            { label: 'Date', value: 'Date' },
            { label: 'Applicant Name', value: row => row.applicants.map(applicant => applicant.name).join(', ') },
            { label: 'Applicant Email', value: row => row.applicants.map(applicant => applicant.email).join(', ') },
            { label: 'Applicant Branch', value: row => row.applicants.map(applicant => applicant.Branch).join(', ') },
            { label: 'Applicant Year', value: row => row.applicants.map(applicant => applicant.year).join(', ') },
            { label: 'Applicant Roll No', value: row => row.applicants.map(applicant => applicant.rollno).join(', ') },
            { label: 'Branch', value: 'Branch' },
            { label: 'Salary', value: 'salary' },
            { label: 'Type', value: 'type' },
            { label: 'Criteria', value: 'criteria' },
            { label: 'InfPo', value: 'info' }
        ];

        // Use json2csvParser to parse the data into CSV format
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(placements);

        // Set response headers and send CSV as response
        res.attachment('placements.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Something went wrong: ${error.message}` });
    }
}
