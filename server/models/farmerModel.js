const mongoose = require("mongoose");

const farmerProfileSchema = new mongoose.Schema({
    landArea: { type: String },
    soilType: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    fullName: { type: String },
    farmerId: { type: mongoose.Schema.Types.ObjectId }
});

const FarmerProfile = mongoose.model("farmer", farmerProfileSchema);

module.exports = FarmerProfile;