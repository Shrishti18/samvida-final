const userModel = require("../models/userModel");

// login callback
const loginController = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("User Not Found");
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

//Register Callback
const registerController = async(req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            newUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};


const getNameById = async(req, res) => {
    const { companyId } = req.params;

    try {
        // Fetch the name based on the _id
        const name = await userModel.findOne({ _id: companyId });

        if (!name) {
            return res.status(404).json({ error: "Name not found" });
        }

        return res.status(200).json({ name }); // Assuming the name is a property in the model
    } catch (error) {
        console.error("Error fetching name:", error);
        res.status(500).json({ error: "Error fetching name" });
    }
};

module.exports = { loginController, registerController, getNameById };