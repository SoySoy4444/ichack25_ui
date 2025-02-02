import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CButton, CContainer, CRow, CCol, CSpinner } from "@coreui/react";
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
  const [loading, setLoading] = useState(false); // Loading state
  const [harvested, setHarvested] = useState({}); // Harvested state

  const onHandleSelected = (selectedCrops) => {
    setCrops(selectedCrops);
  };

  const onHandleHarvest = (crop) => {
    harvested[crop.title] = (harvested[crop.title] ? harvested[crop.title] : 0) + crop.yieldAmount * crop.growth;
    setHarvested(harvested);
    setCrops(crops.filter((c) => c.title !== crop.title));
  }

  const handleShowResults = () => {
    // Convert data to URL-friendly format
    const queryParams = new URLSearchParams({
      month: currMonth,
      results: JSON.stringify(harvested),
    }).toString();
    navigate(`/results?${queryParams}`);
  };

  const handleRunSimulation = async () => {
    setLoading(true); // Start loading
    var cropData = {};
    crops.forEach((crop) => {
      cropData[crop.title] = {
        yieldAmount: crop.yieldAmount ? crop.yieldAmount : 0,
        proportion: crop.proportion ? crop.proportion : 0,
        growth: crop.growth ? crop.growth : 0
      };
  });
    try {
      const response = await fetch("http://localhost:8000/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cropData: cropData,
          location: "London",
          curr_month: currMonth,
        }),
      });

      const updatedData = await response.json();
      console.log("API Response:", updatedData);
      setCurrMonth((currMonth + 1) % 12);

      const newCrops = Object.keys(updatedData).map((crop) => ({
        title: crop,
        ...updatedData[crop]
      }));
      console.log("Newc", newCrops)
      setCrops(newCrops);
    } catch (error) {
      console.error("Error fetching simulation data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <CContainer fluid className="p-4">
      {/* Display Current Month and Run Button */}
      <CRow className="mb-3">
        <CCol className="text-center">
          <h4>Current Month: {monthNames[currMonth]}</h4>
          <CButton color="primary" size="lg" onClick={currMonth < 11 ? handleRunSimulation : handleShowResults} disabled={loading}>
            {loading ? <CSpinner size="sm" /> : currMonth < 11 ? "Run Simulation" : "Show Results"}
          </CButton>
        </CCol>
      </CRow>

      <CRow>
        {/* Crop Chart */}
        <CCol md={6}>
          <CropChart data={crops} />
        </CCol>

        {/* Crop List */}
        <CCol md={6}>
          <CropList
            availableCrops={["wheat", "rice", "corn"]}
            crops={crops}
            setCrops={setCrops}
            onHandleSelected={onHandleSelected}
            onHandleHarvest={onHandleHarvest}
          />
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AppPage;
