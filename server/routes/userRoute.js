const express = require("express");
const {
    loginController,
    registerController,
    getNameById,
} = require("../controllers/userController");

//router object
const router = express.Router();

//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

router.get("/getname/:companyId", getNameById);

module.exports = router;