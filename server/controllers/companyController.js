import CompanyProfile from "../models/companyModel.js";

export const companyprofile = async(req, res) => {
    try {
        const { crops, location, phoneNumber, companyName, companyId } = req.body;
        const companyData = {
            crops,
            location,
            phoneNumber,
            companyName,
            companyId
        };

        const newCompanyprofile = new CompanyProfile(companyData);
        await newCompanyprofile.save();

        res.status(201).json({ message: "Crop added successfully" });
    } catch (error) {
        console.error("Error adding crop:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getCompanyProfile = async(req, res) => {
    const companyId = req.params.companyId;
    try {
        const companyProfile = await CompanyProfile.findOne({ companyId: companyId });
        if (companyProfile) {
            res.status(200).json(companyProfile);
        } else {
            res.status(404).json({ message: "Company profile not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching company profile", error });
    }
};

export const updateCompanyProfile = async(req, res) => {
    const companyId = req.params.companyId;
    const updatedProfileData = req.body;

    try {
        const existingProfile = await CompanyProfile.findOne({ companyId: companyId }, );

        if (!existingProfile) {
            return res.status(404).json({ message: "Company profile not found" });
        }
        existingProfile.set(updatedProfileData);
        const updatedProfile = await existingProfile.save();

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating company profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default {companyprofile, getCompanyProfile, updateCompanyProfile };