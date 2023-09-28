import express from 'express';
const router = express.Router();
import farmerProfileController from "../controllers/farmerController.js";

// POST request to submit farmer profile data
router.post("/farmer-profile", farmerProfileController.createFarmerProfile);
router.get("/profile/:farmerId", farmerProfileController.getFarmerProfile);
router.put("/farmer-profile/:farmerId", farmerProfileController.updateFarmerProfile);

export default router