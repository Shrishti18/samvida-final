import express from 'express';
const router = express.Router();
import companyController from "../controllers/companyController.js";

// POST request to add a crop
router.post("/company-profile", companyController.companyprofile);
router.get("/profile/:companyId", companyController.getCompanyProfile);
router.put("/profile/:companyId", companyController.updateCompanyProfile);

export default router