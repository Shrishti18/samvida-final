// Contract.js
const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema({
    cropName: { type: String, required: true },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' },
    imageUrl: { type: String },
    Quantity: { type: String },
    priceOffered: { type: String },
    qualityParameters: { type: String },
    preferredLocation: { type: String },
    agreementMode: { type: String },

    // Add more fields as needed
});

const Crop = mongoose.model("crops", CropSchema);

module.exports = Crop;