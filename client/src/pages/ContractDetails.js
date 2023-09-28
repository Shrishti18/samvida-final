import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const ContractDetails = () => {
  const [contractDetails, setContractDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = window.location.href;
  const parts = url.split("/");
  const contractId = parts[parts.length - 1];

  useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/contracts/contractdetails/${contractId}`);
        setContractDetails(response.data.contractedCrops);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contract details:", error);
        setError("Error fetching contract details");
        setLoading(false);
      }
    };

    fetchContractDetails();
  }, [contractId]);

  return (
    <Layout>
      <div>
        <h1>Contract Details</h1>
        {loading && <p>Loading contract details...</p>}
        {error && <p>{error}</p>}
        {contractDetails.length > 0 ? (
          <div>
            {contractDetails.map((contract, index) => (
              <div key={index}>
                <p>Crop ID: {contract.cropId}</p>
                <p>Company ID: {contract.companyId}</p>
                {/* Add more contract details here */}
              </div>
            ))}
          </div>
        ) : (
          <p>No contract details found.</p>
        )}
      </div>
    </Layout>
  );
};

export default ContractDetails;
