const express = require("express");
const router = express.Router();
const farmerProfileController = require("../controllers/farmerController");

// POST request to submit farmer profile data
router.post("/farmer-profile", farmerProfileController.createFarmerProfile);
router.get("/profile/:farmerId", farmerProfileController.getFarmerProfile);
router.put("/farmer-profile/:farmerId", farmerProfileController.updateFarmerProfile);

module.exports = router;