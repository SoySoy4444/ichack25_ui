import React, { useState } from "react";
import { 
  CCard, CCardBody, CCardImage, CCardText, CCardTitle, 
  CModal, CModalHeader, CModalBody, CModalFooter, CButton 
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import wheatImage from "../assets/wheat.png";
import cornImage from "../assets/corn.jpg";
import riceImage from "../assets/rice.png";

const CropTile = ({ title, yieldAmount, growth, proportion, onHandleHarvest }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const images = {
    wheat: wheatImage,
    corn: cornImage,
    rice: riceImage,
  };

  const imageSrc = images[title.toLowerCase()] || "../../images/default.png";

  const handleHarvest = () => {
    console.log(`Harvesting ${title}`);
    onHandleHarvest({ title, yieldAmount, growth, proportion });
    setModalVisible(false);
  };

  return (
    <>
      {/* Crop Card (Selectable) */}
      <CCard 
        className="text-center p-2"
        style={{
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          transition: "transform 0.2s ease-in-out",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        onClick={() => setModalVisible(true)}
      >
        {/* Crop Image */}
        <CCardImage 
          orientation="top" 
          src={imageSrc} 
          style={{
            height: "150px",
            objectFit: "cover",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
          }}
        />

        {/* Card Content */}
        <CCardBody>
          <CCardTitle 
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              textTransform: "capitalize",
              marginBottom: "10px",
            }}
          >
            {title}
          </CCardTitle>

          <CCardText style={{ fontSize: "0.95rem", lineHeight: "1.5" }}>
            <span style={{ fontWeight: "bold", color: "#28a745" }}>Yield:</span> {yieldAmount} kg<br />
            <span style={{ fontWeight: "bold", color: "#007bff" }}>Growth:</span> {growth}%<br />
            <span style={{ fontWeight: "bold", color: "#dc3545" }}>Farm Proportion:</span> {proportion}%
          </CCardText>
        </CCardBody>
      </CCard>

      {/* Harvest Confirmation Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)} centered>
        <CModalHeader>
          <strong>Harvest {title}?</strong>
        </CModalHeader>
        <CModalBody>
          <p><strong>Yield:</strong> {yieldAmount} kg</p>
          <p><strong>Growth:</strong> {growth}%</p>
          <p><strong>Farm Proportion:</strong> {proportion}%</p>
          <p>Are you sure you want to harvest this crop?</p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton color="success" onClick={handleHarvest}>Harvest</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default CropTile;
