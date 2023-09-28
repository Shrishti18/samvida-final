import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./FarmerCropDetails.css";

const FarmerCropDetails = () => {
    const url = window.location.href;
    const parts = url.split("/");
    const cropId = parts[parts.length - 1];
    const user = JSON.parse(localStorage.getItem("user"));
    const farmerId = user && user._id;

    const [cropDetails, setCropDetails] = useState(null);
    const [contractDetails, setContractDetails] = useState(null); // New state for contract details
    const [showDialog, setShowDialog] = useState(false);
    const [contractCreationStatus, setContractCreationStatus] = useState(null);

    useEffect(() => {
        fetchCropAndContractDetails(); // Fetch both crop and contract details
    }, [cropId]);

    const fetchCropAndContractDetails = async () => {
        try {
            const cropResponse = await axios.get(`/crops/cropfilter/${cropId}`);
            setCropDetails(cropResponse.data);

            if (cropResponse.data && cropResponse.data.companyId) {
                const companyId = cropResponse.data.companyId;

                const contractResponse = await axios.get(`/contracts/details/${cropId}/${companyId}/${farmerId}`);

                if (contractResponse && contractResponse.data && contractResponse.data.farmerarray) {
                    const currentFarmer = contractResponse.data.farmerarray.find(farmerObj => farmerObj.farmerId === farmerId);

                    if (currentFarmer) {
                        setContractDetails(currentFarmer);
                    } else {
                        setContractDetails(null); // No contract details for the current farmer
                    }
                } else {
                    setContractDetails(null); // No contract details available in the response
                }

                console.log(contractResponse.data);
            }
        } catch (error) {
            console.error("Error fetching details:", error);
        }
    };

    const handleMakeContractClick = () => {
        setShowDialog(true);
    };

    const handleYesClick = async () => {
        try {
            const companyId = cropDetails ? cropDetails.companyId : null;

            const response = await axios.post("/contracts/farmer-side", {
                cropId: cropId,
                companyId: companyId,
                farmerId: farmerId,
            });

            console.log("Contract created:", response.data);
            setContractCreationStatus("success"); // Set success status

            setShowDialog(false);
        } catch (error) {
            console.error("Error creating contract:", error);
            setContractCreationStatus("error"); // Set error status
        }
    };

    const handleNoClick = () => {
        setShowDialog(false);
    };

    return (
        <Layout>
            <div className="FarmerCropDetails">
            <h2>Crop Details</h2>
                {cropDetails ? (
                    <div className="FarmerCropCard">
                        <img src={`http://localhost:8080${cropDetails.imageUrl}`} />
                        <p className="CropName">{cropDetails.cropName}</p>
                        <p>
                        <span>Company Id</span>{" "} <br />
                            <Link to={`/company-details/${cropDetails.companyId}`}>{cropDetails.companyId}</Link>
                        </p>
                        <div className="FarmerCropCardCropSpecs">
                        <p><span>Quantity</span> <br />{cropDetails.Quantity}</p>
                        <p><span>Price</span><br />{cropDetails.priceOffered}</p>
                        <p><span>Quality</span><br />{cropDetails. qualityParameters}</p>
                        </div>
                        <p>Preferred Location: {cropDetails.preferredLocation}</p>

                        {/* Display appropriate message based on contract details */}
                        {contractDetails ? (
                            contractDetails.contractbool ? (
                                <p style={{color: "green"}}>You have been accepted </p>
                            ) : (
                                <p>You have applied for the contract. Please wait for updates.</p>
                            )
                        ) : (
                            <div>
                                <button onClick={handleMakeContractClick}>Make contract</button>
                                {contractCreationStatus === "success" && <p>You will be updated!</p>}
                                {contractCreationStatus === "error" && <p>Try something new</p>}
                                {showDialog && (
                                    <div>
                                        <p>Should we connect you for contact?</p>
                                        <button onClick={handleYesClick}>Yes</button>
                                        <button onClick={handleNoClick}>No</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                
            </div>
        </Layout>
    );
};

export default FarmerCropDetails;
