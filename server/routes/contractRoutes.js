import express from 'express';
const router = express.Router();
import { createContract, getContractsByCompanyAndCrop, updatecontractbool, getContractbooleanvalue, getContractedCropsbyeachfarmer, getDatabycontractid } from "../controllers/contractController.js";

// Route to create a new contract
router.post("/farmer-side", createContract);
router.get("/farmer-find/:cropId/:companyId", getContractsByCompanyAndCrop);
router.put("/update/:contractId", updatecontractbool);
router.get("/details/:cropId/:companyId/:farmerId", getContractbooleanvalue);
router.get("/contracted-crops/:farmerId", getContractedCropsbyeachfarmer);
router.get("/contractdetails/:contractId", getDatabycontractid);

export default router