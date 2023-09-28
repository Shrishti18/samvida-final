import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import "./companyProfile.css"

const AddCropForm = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = user && user._id;
  const [companyData, setCompanyData] = useState({
    crops: "",
    location: "",
    phoneNumber: "",
    companyName: "",
    companyId: companyId,
  });
  const [companyProfile, setCompanyProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyData({
      ...companyData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/company/profile/${companyId}`, companyData);
        console.log("Company profile updated successfully");
      } else {
        await axios.post("/company/company-profile", companyData);
        console.log("Crop data submitted successfully");
      }
      fetchCompanyProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const fetchCompanyProfile = async () => {
    try {
      const response = await axios.get(`/company/profile/${companyId}`);
      console.log(response.data);
      setCompanyProfile(response.data);
    } catch (error) {
      console.error("Error fetching company profile data:", error);
    }
  };

  useEffect(() => {
    fetchCompanyProfile();
  }, [companyId]);

  const handleEditClick = () => {
    setIsEditing(true);
    if (companyProfile) {
      // Pre-fill form data with existing profile data
      setCompanyData({
        crops: companyProfile.crops,
        location: companyProfile.location,
        phoneNumber: companyProfile.phoneNumber,
        companyName: companyProfile.companyName,
        companyId: companyId,
      });
    }
  };

  return (
    <Layout>
      <div className="companyProfileForm">
        {companyProfile ? (
          // Company profile exists, show the profile
          <div>
            <h1>Company Profile</h1>
            {/* Render company profile data here */}
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Crop Name:
                    <br/>
                    <input
                      type="text"
                      name="crops"
                      value={companyData.crops}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Location:
                    <br/>
                    <input
                      type="text"
                      name="location"
                      value={companyData.location}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Phone Number:
                    <br/>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={companyData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Company Name:
                    <br/>
                    <input
                      type="text"
                      name="companyName"
                      value={companyData.companyName}
                      onChange={handleInputChange}
                    />
                  </label>
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
              <div className="companyInfoContainer">
                <p>Crop<br/>{companyProfile.crops}</p>
                <p>Location<br/>{companyProfile.location}</p>
                <p>Phone Number<br/>{companyProfile.phoneNumber}</p>
                <p>Company Name<br/>{companyProfile.companyName}</p>
                <button onClick={handleEditClick}>Edit</button>
              </div>
              </>
            )}
          </div>
        ) : (
          // Company profile does not exist, show the add crop form
          <div>
            <h1>Company Profile</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Crop Name:
                  <input
                    type="text"
                    name="crops"
                    value={companyData.crops}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Location:
                  <input
                    type="text"
                    name="location"
                    value={companyData.location}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Phone Number:
                  <input
                    type="text"
                    name="phoneNumber"
                    value={companyData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Company Name:
                  <input
                    type="text"
                    name="companyName"
                    value={companyData.companyName}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <button type="submit">Add Crop</button>
            </form>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddCropForm;
