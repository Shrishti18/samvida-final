const Crop = require("../models/cropModel"); // Assuming your model is named "Contract"
const User = require("../models/userModel"); // Assuming your user model is named "User"

// Controller for creating a new crop
const createCrop = async(req, res) => {
    try {
        const { cropName, companyId } = req.body;



        // Create the crop with the companyId based on the company user's _id
        const newCrop = new Crop({
            cropName,
            companyId
            // Add more fields as needed
        });

        // Save the new crop
        const savedCrop = await newCrop.save();
        res.status(201).json(savedCrop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getAllCrops = async(req, res) => {
    try {
        const crops = await Crop.find();
        res.status(200).json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};



const getCropsByCompany = async(req, res) => {
    try {
        const { companyId } = req.params;

        // Find all crops with the specified companyId
        const crops = await Crop.find({ companyId });
        res.status(200).json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCropsByCrops = async(req, res) => {
    try {
        const { cropId } = req.params;

        // Find all crops with the specified companyId
        const crops = await Crop.findOne({ _id: cropId });
        res.status(200).json(crops);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const createCropWithImage = async(req, res) => {
    console.log(req.file, 16)
    try {
        const {
            cropName,
            companyId,
            Quantity,
            priceOffered,
            qualityParameters,
            preferredLocation,
            agreementMode,
        } = req.body;

        // Access the uploaded image from the multer middleware
        const uploadedImage = req.file;

        // Assuming you're storing the image in a specific directory
        const imageUrl = `/uploads/${uploadedImage.filename}`;

        // Create the crop with the companyId based on the company user's _id
        const newCrop = new Crop({
            cropName,
            companyId,
            imageUrl,
            Quantity,
            priceOffered,
            qualityParameters,
            preferredLocation,
            agreementMode,
            // Store the image URL
            // Add more fields as needed
        });

        // Save the new crop
        const savedCrop = await newCrop.save();

        res.status(201).json(savedCrop);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createCrop, getCropsByCompany, getAllCrops, getCropsByCrops, createCropWithImage };