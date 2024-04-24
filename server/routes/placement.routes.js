import { Router } from "express";
import { createPlacement, csvDownload, getApplicants, getPlacementBYBranch, getPlacements, joinPlacement } from "../controllers/placement.controller.js";
import { isAdmin, isLogedIn } from "../middleware/user.middleware.js";

const router = Router();

router.post('/create-placement',isLogedIn,isAdmin,createPlacement)

router.get('/get-placements',isLogedIn,getPlacements)

router.post('/join-placement/:id',isLogedIn,joinPlacement)

router.get('/get-applicants/:id',isLogedIn,isAdmin,getApplicants)

router.get('/get-placemnt-branch/:Branch',isLogedIn,getPlacementBYBranch)

router.get('/csv-download',isLogedIn,isAdmin,csvDownload)

export default router;