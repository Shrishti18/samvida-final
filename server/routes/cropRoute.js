const express = require("express");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

const router = express.Router();
const { createCrop, getCropsByCompany, getAllCrops, getCropsByCrops, createCropWithImage } = require("../controllers/cropController");

// Route for creating a new crop
router.post("/addcrop", createCrop);
router.post("/addcropimage", upload.single('image'), createCropWithImage);


router.get("/cropsall", getAllCrops);

// Route for fetching all crops associated with a specific company
router.get("/:companyId", getCropsByCompany);

router.get("/cropfilter/:cropId", getCropsByCrops);


module.exports = router;