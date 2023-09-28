// Contract.js
import mongoose from "mongoose";

const ContractSchema = new mongoose.Schema({
    cropId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'crops' },
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'crops' },
    farmerarray: [{
        farmerId: { type: mongoose.Schema.Types.ObjectId, required: true },
        contractbool: { type: Boolean, default: false },
        applybool: { type: Boolean, default: true }

    }]
});

const Contract = mongoose.model("contract", ContractSchema);

export default Contract;