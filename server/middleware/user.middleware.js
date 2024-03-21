import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const isLogedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        let decodedData;
        if(token){
            decodedData = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decodedData?.id;
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthenticated",success: false});
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(user.isAdmin){
            next();
        }else{
            res.status(403).json({ message: "You are not authorized",success: false});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message,success: false});
    }
}