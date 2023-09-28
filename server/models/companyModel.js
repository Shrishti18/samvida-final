const mongoose = require("mongoose");

const CompanyDetailsSchema = new mongoose.Schema({
    crops: { type: String },
    location: { type: String },
    phoneNumber: { type: String },
    companyName: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId }
});

const CompanyProfile = mongoose.model("company", CompanyDetailsSchema);

module.exports = CompanyProfile;