import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";

const CompanyProfileDetails = () => {
  const [farmerProfile, setFarmerProfile] = useState(null);
  const url = window.location.href;
  const parts = url.split("/");
  const farmerId = parts[parts.length - 1];
  console.log(farmerId)


  useEffect(() => {
    const fetchFarmerProfile = async () => {
      try {
        const response = await axios.get(`/farmer/profile/${farmerId}`);
        console.log(response.data)
        setFarmerProfile(response.data);
      } catch (error) {
        console.error("Error fetching farmer profile:", error);
      }
    };

    fetchFarmerProfile();
  }, [farmerId]);

  return (
    <Layout>
      <h1>Farmer Profile</h1>
      {farmerProfile ? (
        <div>
          <p>Name: {farmerProfile.fullName}</p>
          <p>Farmer's Soil type: {farmerProfile.soilType}</p>
          <p>Location: {farmerProfile.location}</p>
          <p>Phone Number: {farmerProfile.phoneNumber}</p>

          {/* Render other profile details here */}
        </div>
      ) : (
        <p>Loading farmer profile...</p>
      )}
    </Layout>
  );
};

export default CompanyProfileDetails;
