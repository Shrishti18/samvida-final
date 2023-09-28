// import React, { useState } from "react";
// import axios from "axios";
// import { message } from "antd";
// import Layout from "../components/Layout/Layout";


// const CompanyAddCrop = () => {
//   const [cropName, setCropName] = useState("");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const companyId = user && user._id;
//   const handleCreateCrop = async () => {
//     try {
//       const response = await axios.post("/crops/addcrop", {
//         cropName,
//         companyId
//       });
//       if (response.data.success) {
//         message.success("Crop created successfully");
//         // Reset the form after successful creation
//         setCropName("");
//       } else {
//         message.error("Failed to create crop");
//       }
//     } catch (error) {
//       message.error("An error occurred while creating the crop");
//     }
//   };

//   return (
//     <Layout>
//       <div>
//       <h2>Create Crop</h2>
//       <form onSubmit={handleCreateCrop}>
//         <div>
//           <label>Crop Name:</label>
//           <input
//             type="text"
//             value={cropName}
//             onChange={(e) => setCropName(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Create Crop</button>
//       </form>
//     </div>
//     </Layout>

//   );
// };

// export default CompanyAddCrop;

import React, { useState } from "react";
import axios from "axios";
import { message } from "antd";
import Layout from "../components/Layout/Layout";
import { token } from "morgan";
import "./CompanyAddCrop.css"

const CompanyAddCrop = () => {
  const [cropName, setCropName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [priceOffered, setPriceOffered] = useState("");
  const [qualityParameters, setQualityParameters] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [agreementMode, setAgreementMode] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const companyId = user && user._id;

  const handleCreateCrop = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cropName", cropName);
      formData.append("companyId", companyId);
      formData.append("image", selectedImage);
      formData.append("Quantity", quantity);
      formData.append("priceOffered", priceOffered);
      formData.append("qualityParameters", qualityParameters);
      formData.append("preferredLocation", preferredLocation);
      formData.append("agreementMode", agreementMode);

      const response = await axios.post("/crops/addcropimage", formData, {
        headers: {
          'Authorization': localStorage.getItem(token)
        }
      });
      if (response.status === 201) {
        message.success("Crop created successfully");
        setCropName("");
        setSelectedImage(null);
        setQuantity("");
        setPriceOffered("");
        setQualityParameters("");
        setPreferredLocation("");
        setAgreementMode("");
      } else {
        message.error("Failed to create crop");
      }
    } catch (error) {
      message.error("An error occurred while creating the crop");
    }
  };

  return (
    <Layout>
      <div className="addCrop">
        <h2>Create Crop</h2>
        <form onSubmit={handleCreateCrop}>
          <div>
            <label>Crop Name:</label>
            <br/>
            <input
              type="text"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Upload Image:</label>
            <br/>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <br/>
            <input
              type="text"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Price Offered:</label>
            <br/>
            <input
              type="text"
              value={priceOffered}
              onChange={(e) => setPriceOffered(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quality Parameters:</label>
            <br/>
            <input
              type="text"
              value={qualityParameters}
              onChange={(e) => setQualityParameters(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Preferred Location:</label>
            <br/>
            <input
              type="text"
              value={preferredLocation}
              onChange={(e) => setPreferredLocation(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Agreement Mode:</label>
            <br/>
            <input
              type="text"
              value={agreementMode}
              onChange={(e) => setAgreementMode(e.target.value)}
              required
            />
          </div>
          <button type="submit">Create Crop</button>
        </form>
      </div>
    </Layout>
  );
};

export default CompanyAddCrop;
