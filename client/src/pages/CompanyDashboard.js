import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./CompanyDashboard.css";

const CompanyDashboard = () => {
  const [crops, setCrops] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = user && user._id;

  useEffect(() => {
    if (companyId) {
      axios
        .get(`/crops/${companyId}`)
        .then((response) => {
          setCrops(response.data);
        })
        .catch((error) => {
          console.error("Error fetching crops:", error);
        });
    }
  }, [companyId]);

  return (
    <Layout>
      <div className="companyDash">
        <h1>Company Dashboard</h1>
        <Link to="/company/add-crop">Add a Crop</Link>
      </div>
      <h4>Crops you have created</h4>
      <div className="allCropsCompanyDash">
      {crops.length > 0 ? (
        <div className="companyDashContent">
          {crops.map((crop) => (
            <div className="cropCompanyDash"
              key={crop._id}
              style={{
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div className="dynamicCompanyDash">
              <p style={{ flex: 1, margin: 0 }}>{crop.cropName}</p>
              </div>
              <div className="actionCompanyDash">
              <Link
                to={`/company/company-crop-details/${crop._id}`} // Pass the cropId in the URL
                className="btn btn-secondary btn-sm"
              >
                Check Updates
              </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No crops found for this company.</p>
      )}
      </div>
    </Layout>
  );
};

export default CompanyDashboard;
