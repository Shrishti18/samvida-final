const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

// POST request to add a crop
router.post("/company-profile", companyController.companyprofile);
router.get("/profile/:companyId", companyController.getCompanyProfile);
router.put("/profile/:companyId", companyController.updateCompanyProfile);

module.exports = router;