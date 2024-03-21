import { Router } from "express";
import { getUserProfile, loginController, registerController } from "../controllers/user.controller.js";
import { isLogedIn } from "../middleware/user.middleware.js";

const router = Router();    

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile',isLogedIn,getUserProfile)


export default router;
