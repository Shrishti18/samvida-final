import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const farmerId = user && user._id;

  const [formData, setFormData] = useState({
    landArea: "",
    soilType: "",
    location: "",
    phoneNumber: "",
    fullName: "",
    farmerId: farmerId,
  });

  const [profileData, setProfileData] = useState(null);
  const [profileExist, setProfileExist] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting form data:", formData);
    try {
      if (isEditing) {
        await axios.put(`/farmer/farmer-profile/${farmerId}`, formData);
        console.log("Profile data updated successfully");
      } else {
        await axios.post(`/farmer/farmer-profile/`, formData);
        console.log("Form data submitted successfully");
      }
      fetchProfileData();
      setIsEditing(false); // Turn off edit mode
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`/farmer/profile/${farmerId}`);
      setProfileData(response.data);
      setProfileExist(true);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    if (profileData) {
      // Pre-fill form data with existing profile data
      setFormData({
        landArea: profileData.landArea,
        soilType: profileData.soilType,
        location: profileData.location,
        phoneNumber: profileData.phoneNumber,
        fullName: profileData.fullName,
        farmerId: farmerId,
      });
    }
  };

  return (
    <Layout>
      <div className="profile-container">
        <div className="input-section">
          {profileExist ? (
            <div>
              {!isEditing ? (
                <>
                <div className="farmerProfileEdit">
                  <h1>Farmer Profile</h1>
                  <button type="button" onClick={handleEditClick}>
                    Edit Profile
                  </button>
                </div>
                <div className="farmerInfoContainer">
                <p>Land Area <br/><span>{profileData?.landArea}</span></p>
                  <p>Soil Type <br/><span>{profileData?.soilType}</span></p>
                  <p>Location <br/><span>{profileData?.location}</span></p>
                  <p>Phone Number <br/><span>{profileData?.phoneNumber}</span></p>
                  <p>Full Name <br/><span>{profileData?.fullName}</span></p>
                </div>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <label>
                      Land Area
                      <br/>
                      <input
                        type="text"
                        name="landArea"
                        value={formData.landArea}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Soil Type
                      <br/>
                      <input
                        type="text"
                        name="soilType"
                        value={formData.soilType}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Location
                      <br/>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Phone Number
                      <br/>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Full Name
                      <br/>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <button type="submit">Save Profile</button>
                  <button type="button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Land Area:
                  <input
                    type="text"
                    name="landArea"
                    value={formData.landArea}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Soil Type:
                  <input
                    type="text"
                    name="soilType"
                    value={formData.soilType}
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
                    value={formData.location}
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
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Full Name:
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </label>
              </div>
              <button type="submit">Save Profile</button>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FarmerProfile;
