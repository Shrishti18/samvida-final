import express from 'express';
import multer from 'multer';
const upload = multer({ dest: 'uploads/' })

const router = express.Router();
import { createCrop, getCropsByCompany, getAllCrops, getCropsByCrops, createCropWithImage } from "../controllers/cropController.js";

// Route for creating a new crop
router.post("/addcrop", createCrop);
router.post("/addcropimage", upload.single('image'), createCropWithImage);


router.get("/cropsall", getAllCrops);

// Route for fetching all crops associated with a specific company
router.get("/:companyId", getCropsByCompany);

router.get("/cropfilter/:cropId", getCropsByCrops);


export default router