const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");

// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static('uploads'))

//routes
app.use("/api/v1/users", require("./routes/userRoute"));
app.use("/api/v1/crops", require("./routes/cropRoute"));
app.use("/api/v1/contracts", require("./routes/contractRoutes"));
app.use("/api/v1/farmer", require("./routes/farmerRoutes"));
app.use("/api/v1/company", require("./routes/companyRoutes"));

//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});