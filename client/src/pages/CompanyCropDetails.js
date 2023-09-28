import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./CompanyCropDetails.css"

const CropDetails = () => {
  const url = window.location.href;
  const parts = url.split("/");
  const cropId = parts[parts.length - 1];
  const [cropDetails, setCropDetails] = useState(null);
  const [contracts, setContracts] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = user && user._id;

  useEffect(() => {
    // Fetch crop details based on the cropId
    const fetchCropDetails = async () => {
      try {
        const response = await axios.get(`/crops/cropfilter/${cropId}`);
        setCropDetails(response.data);
      } catch (error) {
        console.error("Error fetching crop details:", error);
      }
    };

    // Fetch contracts associated with the companyId and cropId
    const fetchContracts = async () => {
      try {
        const response = await axios.get(`/contracts/farmer-find/${cropId}/${companyId}`);
        setContracts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    // Call the fetchCropDetails and fetchContracts functions
    fetchCropDetails();
    fetchContracts();
  }, [cropId, companyId]);

  const handleButtonClick = async (farmerId) => {
    try {
      // Clone the contracts to avoid direct state mutation
      const updatedContracts = { ...contracts };
      // Find the index of the farmer in the array
      const farmerIndex = updatedContracts.farmerarray.findIndex((farmer) => farmer.farmerId === farmerId);
      if (farmerIndex !== -1) {
        // Update the contractbool property of the farmer
        updatedContracts.farmerarray[farmerIndex].contractbool = true;
        // Send the updated contracts to the server
        await axios.put(`/contracts/update/${updatedContracts._id}`, updatedContracts);
        // Update the state with the updated contracts
        setContracts(updatedContracts);
      }
    } catch (error) {
      console.error("Error updating contract:", error);
    }
  };

  return (
    <Layout>
      <div className="companyCropDetails">
        <h1 >Crop Details</h1>
        {cropDetails ? (
          <div className="companyCropDetailsName">
            <p>Crop Name: {cropDetails.cropName}</p>
            {/* Add more crop details here */}
          </div>
        ) : (
          <div>Loading crop details...</div>
        )}
        {contracts ? (
          <div>
            <h2 >Farmers involved in contracts:</h2>
            <p >Total Farmers: {contracts.farmerarray.length}</p>
            <ul>
              {contracts.farmerarray.map((farmer, index) => (
                <li key={index}>
                  <p>
                    <strong>Farmer ID:</strong>{" "}
                    <br/>
                    <Link to={`/farmer-details/${farmer.farmerId}`}>{farmer.farmerId}</Link>
                  </p>
                  {farmer.contractbool ? (
                    <div className="statusCompanyCropDetails">
                    <p style={{ color: "green" }}>This farmer has been accepted.</p>
                    </div>
                  ) : (
                    <>
                      <button onClick={() => handleButtonClick(farmer.farmerId)} className="btn btn-success">
                        Accept
                      </button>
                      <button onClick={() => handleButtonClick(farmer.farmerId)} className="btn btn-danger">
                        Reject
                      </button>
                    </>
                  )}
                  {farmer.contractbool && (
                    <div className="getContractDetails">
                    <Link
                      to={`/contract-details/${farmer._id}`}
                      className="btn btn-primary"
                    >
                      Get Contract Details
                    </Link>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No contracts found for this crop and company.</p>
        )}
      </div>
    </Layout>
  );
};

export default CropDetails;
