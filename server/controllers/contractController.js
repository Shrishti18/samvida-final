const Contract = require("../models/contractModel");

const createContract = async(req, res) => {
    try {
        const { cropId, companyId, farmerId } = req.body;

        // Find the existing contract by cropId and companyId
        let contract = await Contract.findOne({ cropId: cropId, companyId: companyId });

        if (!contract) {
            // If the contract doesn't exist, create a new one with the new farmerId
            contract = new Contract({
                cropId,
                companyId,
                farmerarray: [{ farmerId: farmerId, contractbool: false, acceptbool: true }], // Start with a new array containing the farmerId
            });
        } else {
            // If the contract already exists, add the new farmerId to the farmerarray
            contract.farmerarray.push({ farmerId: farmerId, contractbool: false, acceptbool: true });
        }

        // Save the updated contract
        const updatedContract = await contract.save();

        // Respond with the created/updated contract
        res.status(201).json(updatedContract);
    } catch (error) {
        console.error("Error creating contract:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getContractsByCompanyAndCrop = async(req, res) => {
    try {
        const { cropId, companyId } = req.params;
        let contracts = await Contract.findOne({ cropId: cropId, companyId: companyId });

        // Respond with the contracts
        res.status(200).json(contracts);
    } catch (error) {
        console.error("Error fetching contracts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updatecontractbool = async(req, res) => {
    const { contractId } = req.params;
    const { farmerarray } = req.body;

    try {
        // Update the contract with the new farmerarray
        const updatedContract = await Contract.findByIdAndUpdate(
            contractId, { $set: { farmerarray } }, { contractbool: true } // Return the updated contract
        );
        res.status(200).json(updatedContract);
    } catch (error) {
        console.error("Error updating contract:", error);
        res.status(500).json({ error: "Error updating contract" });
    }
};

const getContractbooleanvalue = async(req, res) => {
    const { cropId, companyId, farmerId } = req.params;
    try {
        // Find the contract that matches the cropId and companyId
        const contract = await Contract.findOne({ cropId: cropId, companyId: companyId });

        if (!contract) {
            return res.status(404).json({ error: "Contract not found" });
        }

        // Send the contract data for the specified cropId and companyId
        return res.status(200).json(contract);
    } catch (error) {
        console.error("Error fetching contract details:", error);
        res.status(500).json({ error: "Error fetching contract details" });
    }
};

const getContractedCropsbyeachfarmer = async(req, res) => {
    try {
        const { farmerId } = req.params;

        // Find all contracts where the specified farmerId has contractbool set to true
        const contractedCrops = await Contract.find({
            "farmerarray.farmerId": farmerId,
            "farmerarray.contractbool": true
        }, {
            "cropId": 1,
            "companyId": 1,
            "farmerarray.$": 1 // Select only the matched element from the farmerarray
        });

        res.status(200).json({ contractedCrops });
    } catch (error) {
        console.error("Error fetching contracted crops:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getDatabycontractid = async(req, res) => {
    try {
        const { contractId } = req.params;

        // Find all contracts where the specified farmerId has contractbool set to true
        const contractedCrops = await Contract.find({
            "farmerarray._id": contractId,
            "farmerarray.contractbool": true
        }, {
            "cropId": 1,
            "companyId": 1,
            "farmerarray.$": 1 // Select only the matched element from the farmerarray
        });

        res.status(200).json({ contractedCrops });
    } catch (error) {
        console.error("Error fetching contracted crops:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};








module.exports = {
    createContract,
    getContractsByCompanyAndCrop,
    updatecontractbool,
    getContractbooleanvalue,
    getContractedCropsbyeachfarmer,
    getDatabycontractid
};