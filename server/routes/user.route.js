import { Router } from "express";
import { getUserProfile, loginController, registerController } from "../controllers/user.controller.js";
import { isLogedIn } from "../middleware/user.middleware.js";
import uploads from '../middleware/multer.middlware.js'

const router = Router();    

router.post('/register',uploads.single('resume'), registerController);
router.post('/login', loginController);
router.get('/profile',isLogedIn,getUserProfile)


export default router;
