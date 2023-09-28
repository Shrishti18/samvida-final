import express from 'express';
import {
    loginController,
    registerController,
    getNameById,
} from "../controllers/userController.js"; // Note the .mjs extension



//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

router.get("/getname/:companyId", getNameById);

export default router