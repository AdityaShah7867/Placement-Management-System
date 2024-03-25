import { Router } from "express";
import { createPlacement, getApplicants, getPlacementBYBranch, getPlacements, joinPlacement } from "../controllers/placement.controller.js";
import { isAdmin, isLogedIn } from "../middleware/user.middleware.js";

const router = Router();

router.post('/create-placement',isLogedIn,isAdmin,createPlacement)

router.get('/get-placements',isLogedIn,getPlacements)

router.post('/join-placement/:id',isLogedIn,joinPlacement)

router.get('/get-applicants/:id',isLogedIn,isAdmin,getApplicants)

router.get('/get-placemnt-branch',isLogedIn,getPlacementBYBranch)

export default router;