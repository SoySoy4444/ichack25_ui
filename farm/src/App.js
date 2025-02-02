import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CContainer, CRow, CCol, CSpinner, CCard, CCardBody } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import CropChart from "./components/CropChart";
import CropList from "./components/CropList";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const AppPage = () => {
  const navigate = useNavigate();
  const [currMonth, setCurrMonth] = useState(0);
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [harvested, setHarvested] = useState({});

  const onHandleSelected = (selectedCrops) => {
    setCrops(selectedCrops);
  };

  const onHandleHarvest = (crop) => {
    harvested[crop.title] = (harvested[crop.title] ? harvested[crop.title] : 0) + crop.yieldAmount * crop.growth;
    setHarvested({ ...harvested });
    setCrops(crops.filter((c) => c.title !== crop.title));
  };

  const handleShowResults = () => {
    const queryParams = new URLSearchParams({
      month: currMonth,
      results: JSON.stringify(harvested),
    }).toString();
    navigate(`/results?${queryParams}`);
  };

  const handleRunSimulation = async () => {
    setLoading(true);
    const cropData = {};
    crops.forEach((crop) => {
      cropData[crop.title] = {
        yieldAmount: crop.yieldAmount || 0,
        proportion: crop.proportion || 0,
        growth: crop.growth || 0
      };
    });

    try {
      const response = await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cropData, location: "London", curr_month: currMonth }),
      });

      const updatedData = await response.json();
      console.log("API Response:", updatedData);
      setCurrMonth((currMonth + 1) % 12);

      const newCrops = Object.keys(updatedData).map((crop) => ({
        title: crop,
        ...updatedData[crop]
      }));
      setCrops(newCrops);
    } catch (error) {
      console.error("Error fetching simulation data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CContainer fluid className="p-4" style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      
      {/* Header Card */}
      <CCard className="mb-4 shadow-sm border-0" style={{ borderRadius: "16px", background: "#fff" }}>
        <CCardBody className="text-center">
          <h2 style={{ fontWeight: "600", marginBottom: "10px", color: "#333" }}>🌱 CropCast</h2>
          <h4 style={{ fontSize: "1.3rem", color: "#555" }}>Current Month: <strong>{monthNames[currMonth]}</strong></h4>
          <CButton 
            color="primary" 
            size="lg" 
            onClick={currMonth < 11 ? handleRunSimulation : handleShowResults} 
            disabled={loading}
            style={{
              marginTop: "15px",
              padding: "12px 24px",
              fontSize: "1.1rem",
              transition: "all 0.3s",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
            }}
          >
            {loading ? <CSpinner size="sm" /> : currMonth < 11 ? "▶ Run Simulation" : "📊 Show Results"}
          </CButton>
        </CCardBody>
      </CCard>

      <CRow>
        {/* Crop Chart Section */}
        <CCol md={6}>
          <CCard className="shadow-sm border-0" style={{ borderRadius: "12px", padding: "15px" }}>
            <CCardBody>
              <h5 style={{ fontWeight: "600", marginBottom: "15px", color: "#333" }}>📈 Crop Growth Overview</h5>
              <CropChart data={crops} />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Crop List Section */}
        <CCol md={6}>
          <CCard className="shadow-sm border-0" style={{ borderRadius: "12px", padding: "15px" }}>
            <CCardBody>
              <h5 style={{ fontWeight: "600", marginBottom: "15px", color: "#333" }}>🌾 Manage Your Crops</h5>
              <CropList
                availableCrops={["wheat", "rice", "corn"]}
                crops={crops}
                setCrops={setCrops}
                onHandleSelected={onHandleSelected}
                onHandleHarvest={onHandleHarvest}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AppPage;
