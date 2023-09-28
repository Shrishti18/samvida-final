// import React, { useState, useEffect } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import FarmerDashboard from "./pages/FarmerDashboard";
// import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
// import CompanyDashboard from "./pages/CompanyDashboard";
// import FarmerSearch from "./pages/FarmerSearch";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/farmer/" element={<ProtectedRoutes><FarmerSearch/></ProtectedRoutes>} />
//       <Route path="/farmer/farmer-dashboard" element={<ProtectedRoutes><FarmerSearch/></ProtectedRoutes>} />

//       <Route path="/company/*" element={<ProtectedRoutes><CompanyDashboard /></ProtectedRoutes>} />
//       <Route path="/entrepreneur/*" element={<ProtectedRoutes><EntrepreneurDashboard /></ProtectedRoutes>} />
//     </Routes>
//   );
// }

// export function ProtectedRoutes(props) {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const location = useLocation();

//   if (user) {
//     const { role } = user;
//     const allowedPaths = [`/${role}`,`/${role}-dashboard`]; // Add more allowed paths as needed

//     // Check if the current location matches allowed paths
//     const isAllowed = allowedPaths.some(allowedPath => location.pathname.startsWith(allowedPath));

//     if (isAllowed) {
//       return props.children; // Allow access to the requested dashboard or page
//     } else {
//       return <Navigate to={`/${role}`} />; // Redirect to user's dashboard
//     }
//   } else {
//     return <Navigate to="/login" />;
//   }
// }

// export default App;
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FarmerDashboard from "./pages/FarmerDashboard";
import FarmerSearch from "./pages/FarmerSearch";
import FarmerMax from "./pages/FarmerMax";
import CompanyProfile from "./pages/CompanyProfile";
import CompanyDashboard from "./pages/CompanyDashboard";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";
import FarmerProfile from "./pages/FarmerProfile";
import CompanyAddCrop from "./pages/CompanyAddCrop";
import FarmerCropDetails from "./pages/FarmerCropDetails";
import CompanyCropDetails from "./pages/CompanyCropDetails";
import ContractDetails from "./pages/ContractDetails";
import FarmerProfileDetails from "./pages/FarmerProfileDetails";
import CompanyProfileDetails from "./pages/CompanyProfileDetails";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isFarmer = user && user.role === "farmer";
  const isCompany = user && user.role === "company";
  const isEntrepreneur = user && user.role === "entrepreneur";

  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/farmer" element={<FarmerSearch />} />
      <Route path="/company" element={<CompanyDashboard />} />
      <Route path="/entrepreneur" element={<EntrepreneurDashboard />} />

      <Route path="/contract-details/:contractId" element={<ContractDetails />} />
      <Route path="/company-details/:companyId" element={<CompanyProfileDetails />} />
      <Route path="/farmer-details/:farmerId" element={<FarmerProfileDetails />} />

      {isFarmer && (
        <>
          <Route path="/farmer/farmer-dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/farmer-maxprofit" element={<FarmerMax />} />
          <Route path="/farmer/farmer-profile" element={<FarmerProfile />} />
          <Route path="/farmer/farmer-crop-details/:cropid" element={<FarmerCropDetails />} />

          {/* Add more farmer-specific routes */}
        </>
      )}

      {isCompany && (
        <>
          <Route path="/company" element={<CompanyDashboard />} />
          <Route path="/company/company-profile" element={<CompanyProfile />} />
          <Route path="/company/add-crop" element={<CompanyAddCrop />} />
          <Route path="/company/company-crop-details/:cropid" element={<CompanyCropDetails />} />

          
          {/* Add more company-specific routes */}
        </>
      )}

      {isEntrepreneur && (
        <>
          {/* Add more entrepreneur-specific routes */}
        </>
      )}
    </Routes>
  );
}

export function ProtectedRoutes(props) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const { role } = user;
    
    // Route to the user's specific dashboard based on their role
    switch (role) {
      case "farmer":
        return <Navigate to="/farmer" />;
      case "company":
        return <Navigate to="/company" />;
      case "entrepreneur":
        return <Navigate to="/entrepreneur" />;
      default:
        return <Navigate to="/login" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
}

export default App;
