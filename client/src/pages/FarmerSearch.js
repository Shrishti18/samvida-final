import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import "./FarmerSearch.css"; // Import your custom CSS file for styling
import { Link } from "react-router-dom";
import Button from "../components/button/button";

const FarmerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [companyNames, setCompanyNames] = useState({});

  useEffect(() => {
    // Fetch all crops and company names when the component mounts
    const fetchCropsAndCompanyNames = async () => {
      try {
        const cropsResponse = await axios.get("/crops/cropsall");
        const cropsData = cropsResponse.data;
        setCrops(cropsData);
        setFilteredCrops(cropsData);

        // Fetch company names for each crop
        const companyPromises = cropsData.map(async (crop) => {
          try {
            const companyResponse = await axios.get(`/users/getname/${crop.companyId}`);
            return { companyId: crop.companyId, companyName: companyResponse.data.name.name };
          } catch (error) {
            console.error("Error fetching company details:", error);
            return { companyId: crop.companyId, companyName: "N/A" };
          }
        });

        const companyResults = await Promise.all(companyPromises);
        const companyMap = {};
        companyResults.forEach((result) => {
          companyMap[result.companyId] = result.companyName;
        });

        setCompanyNames(companyMap);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };

    fetchCropsAndCompanyNames();
  }, []);

  const handleSearch = () => {
    // Filter crops based on the search query
    if (searchQuery.trim() !== "") {
      const filtered = crops.filter(
        (crop) =>
          crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (companyNames[crop.companyId] || "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCrops(filtered);
    } else {
      setFilteredCrops(crops);
    }
  };

  return (
    <Layout>
      <div className="farmer-dashboard">
        <div className="top-farmer">
          <h1>Welcome back!</h1>
          <div className="search-container" style={{ marginTop: "2vh" }}>
            <input
              type="text"
              placeholder="Enter your search query"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                marginRight: "2vw",
              }}
            />
            <Button buttonStyle="btn-normal" onClick={handleSearch}>
                  Search
                </Button>
          </div>
        </div>
        <div className="bottom-farmer">
          <div className="crops-list" style={{ marginTop: "8vh" }}>
            <h2>List of Crops</h2>
            <div className="crop-cards">
              {filteredCrops.map((crop) => (
                <div key={crop._id} className="crop-card">
                  <img src={`http://localhost:8080${crop.imageUrl}`} alt={crop.cropName} />
                  <h3>{crop.cropName}</h3>
                  <p>Company: {companyNames[crop.companyId] || "Fetching company name..."}</p>
                  <Link
                    to={{
                      pathname: `/farmer/farmer-crop-details/${crop._id}`,
                    }}
                    className="btn btn-normal"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerSearch;
