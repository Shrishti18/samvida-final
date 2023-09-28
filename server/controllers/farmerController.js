const FarmerProfile = require("../models/farmerModel");

const createFarmerProfile = async(req, res) => {
    try {
        // Create a new farmer profile document based on the submitted form data
        const { landArea, soilType, location, phoneNumber, fullName, farmerId } = req.body;

        const farmerProfile = new FarmerProfile({
            landArea,
            soilType,
            location,
            phoneNumber,
            fullName,
            farmerId
        });

        // Save the farmer profile to the database
        await farmerProfile.save();

        res.status(201).json({ message: "Farmer profile created successfully" });
    } catch (error) {
        console.error("Error creating farmer profile:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getFarmerProfile = async(req, res) => {
    const { farmerId } = req.params;

    try {
        const profile = await FarmerProfile.findOne({ farmerId: farmerId });

        if (profile) {
            res.status(200).json(profile);
        } else {
            res.status(404).json({ message: "Profile not found" });
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const updateFarmerProfile = async(req, res) => {
    const { farmerId } = req.params;
    const updatedProfileData = req.body;

    try {
        const existingProfile = await FarmerProfile.findOne({ farmerId: farmerId });

        if (!existingProfile) {
            return res.status(404).json({ message: "Farmer profile not found" });
        }

        existingProfile.set(updatedProfileData);
        const updatedProfile = await existingProfile.save();

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating farmer profile:", error);
        res.status(500).json({ message: "Error updating farmer profile" });
    }
};

module.exports = { createFarmerProfile, getFarmerProfile, updateFarmerProfile };