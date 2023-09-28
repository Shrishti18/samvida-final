import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const CompanyProfileDetails = ({ match }) => {
    const url = window.location.href;
  const parts = url.split("/");
  const companyId = parts[parts.length - 1];
  const [companyProfile, setCompanyProfile] = useState(null);

  useEffect(() => {
    fetchCompanyProfile(); // Fetch company profile details
  }, [companyId]);

  const fetchCompanyProfile = async () => {
    try {
      const response = await axios.get(`/company/profile/${companyId}`);
      setCompanyProfile(response.data);
    } catch (error) {
      console.error("Error fetching company profile:", error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Company Profile</h1>
        {companyProfile ? (
          <div>
            <p>Company Name: {companyProfile.companyName}</p>
            <p>Crops these companies are interested in: {companyProfile.crops}</p>
            <p>Phone Number: {companyProfile.phoneNumber}</p>
            <p>Location there are interested in: {companyProfile.location}</p>

            {/* Display other company profile details here */}
          </div>
        ) : (
          <p>Loading company profile...</p>
        )}
      </div>
    </Layout>
  );
};

export default CompanyProfileDetails;
