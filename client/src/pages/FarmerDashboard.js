// // Assuming this code is within your dashboard.js file
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Layout from "../components/Layout/Layout";

// const FarmerDashboard = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const farmerId = user && user._id;
//   const [contractedCrops, setContractedCrops] = useState([]);

//   useEffect(() => {
//     // Call the getContractedCrops route when the component mounts
//     if (farmerId) {
//       axios
//         .get(`/contracts/contracted-crops/${farmerId}`)
//         .then((response) => {
//           const { contractedCrops } = response.data;
//           setContractedCrops(contractedCrops);
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error("Error fetching contracted crop IDs:", error);
//         });
//     }
//   }, [farmerId]);

//   const [cropNames, setCropNames] = useState({});

//   useEffect(() => {
//     // Fetch crop names for each contracted crop
//     const fetchCropNames = async () => {
//       const cropNamePromises = contractedCrops.map(async (contract) => {
//         try {
//           const response = await axios.get(`/crops/cropfilter/${contract.cropId}`);
//           return { cropId: contract.cropId, cropName: response.data.cropName };
//         } catch (error) {
//           console.error("Error fetching crop details:", error);
//           return { cropId: contract.cropId, cropName: "N/A" };
//         }
//       });

//       const cropNameResults = await Promise.all(cropNamePromises);
//       const cropNameMap = {};
//       cropNameResults.forEach((result) => {
//         cropNameMap[result.cropId] = result.cropName;
//       });

//       setCropNames(cropNameMap);
//     };

//     if (contractedCrops.length > 0) {
//       fetchCropNames();
//     }
//   }, [contractedCrops]);

//   return (
//     <Layout>
//       <div>
//         <h1>Contracts You Are Part Of</h1>
//         <ul>
//           {contractedCrops.length === 0 ? (
//             <p>No contracted crops found.</p>
//           ) : (
//             contractedCrops.map((contract) => (
//               <li key={contract.cropId}>
//                 Crop ID: {contract.cropId}
//                 <br />
//                 Company ID: {contract.companyId}
//                 <br />
//                 Crop Name: {cropNames[contract.cropId] || "Fetching..."}
//               </li>
//             ))
//           )}
//         </ul>
//       </div>
//     </Layout>
//   );
// };

// export default FarmerDashboard;

// Assuming this code is within your dashboard.js file
import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import "./FarmerDashboard.css";

const FarmerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const farmerId = user && user._id;
  const [contractedCrops, setContractedCrops] = useState([]);
  const [cropNames, setCropNames] = useState({});
  const [companyNames, setCompanyNames] = useState({});

  useEffect(() => {
    // Call the getContractedCrops route when the component mounts
    if (farmerId) {
      axios
        .get(`/contracts/contracted-crops/${farmerId}`)
        .then((response) => {
          const { contractedCrops } = response.data;
          setContractedCrops(contractedCrops);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching contracted crop IDs:", error);
        });
    }
  }, [farmerId]);

  useEffect(() => {
    // Fetch crop names for each contracted crop
    const fetchCropNames = async () => {
      const cropNamePromises = contractedCrops.map(async (contract) => {
        try {
          const response = await axios.get(`/crops/cropfilter/${contract.cropId}`);
          return { cropId: contract.cropId, cropName: response.data.cropName };
        } catch (error) {
          console.error("Error fetching crop details:", error);
          return { cropId: contract.cropId, cropName: "N/A" };
        }
      });

      const cropNameResults = await Promise.all(cropNamePromises);
      const cropNameMap = {};
      cropNameResults.forEach((result) => {
        cropNameMap[result.cropId] = result.cropName;
      });

      setCropNames(cropNameMap);
    };

    // Fetch company names for each contracted crop
    const fetchCompanyNames = async () => {
      const companyPromises = contractedCrops.map(async (contract) => {
        try {
          const response = await axios.get(`/users/getname/${contract.companyId}`);
          return { companyId: contract.companyId, companyName: response.data.name.name };
        } catch (error) {
          console.error("Error fetching company details:", error);
          return { companyId: contract.companyId, companyName: "N/A" };
        }
      });

      const companyResults = await Promise.all(companyPromises);
      const companyMap = {};
      companyResults.forEach((result) => {
        companyMap[result.companyId] = result.companyName;
      });

      setCompanyNames(companyMap);
    };

    if (contractedCrops.length > 0) {
      fetchCropNames();
      fetchCompanyNames();
    }
  }, [contractedCrops]);

  return (
    <Layout>
      <div className="farmerDashboard">
        <h1>Contracts You Are Part Of</h1>
        <div className="farmerDashLi">
        <ul>
        <div className="fDashLi">
          {contractedCrops.length === 0 ? (
            <p>No contracted crops found.</p>
          ) : (
            contractedCrops.map((contract) => (
              <li key={contract.cropId}>
                <div className="dynamicCardDashF">
                   <div className="farmerDashCropName">
                {cropNames[contract.cropId] || "Fetching crop name..."}
                </div>
                <div className="farmerDashCompanyName">
                <Link to={`/company-details/${contract.companyId}`} style={{ display: "block", margin: "0px", color: "rgb(64, 64, 64)" }}>
              
                  {companyNames[contract.companyId] || "Fetching company name..."}
            
                </Link>
                </div> 
                </div>               
                <br />
                {contract.farmerarray.map((farmer, index) => (
                  <div className="actionCardDashF">
                  <Link
                    key={index}
                    to={`/contract-details/${farmer._id}`} // Assuming each farmer has a unique _id
                    style={{ display: "block", margin: "0px" }}
                  >
                    <div className="farmerDash">
                    <button >View Contract Details </button>
                    </div>
                  </Link>
                  </div>
                ))}
              </li>
            ))
          )}
          </div>
        </ul>
        </div>
      </div>
    </Layout>
  );
};

export default FarmerDashboard;

