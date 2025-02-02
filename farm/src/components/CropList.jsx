import React, { useState } from "react";
import {
  CButton,
  CContainer,
  CRow,
  CCol,
  CFormInput,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormRange,
  CCard,
  CCardBody,
  CCardTitle,
} from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import CropTile from "./CropTile";

const CropList = ({ availableCrops, crops, setCrops, onHandleSelected, onHandleHarvest }) => {
  console.log("Crops in list", crops);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [proportion, setProportion] = useState(50);
  const [availableProportion, setAvailableProportion] = useState(100);

  const handleOpenModal = (crop) => {
    setAvailableProportion(
      crops.length > 0
        ? 100 - crops.reduce((acc, crop) => acc + crop.proportion, 0)
        : 100
    );
    setSelectedCrop(crop);
    setModalVisible(true);
  };

  const handleConfirmSelection = () => {
    if (selectedCrop) {
      const newCrop = { title: selectedCrop, proportion: proportion, growth: 0, yieldAmount: 0 };
      const newCrops = [...crops, newCrop];
      setCrops(newCrops);
      onHandleSelected(newCrops);
    }
    setModalVisible(false);
  };

  return (
    <CContainer>
      {/* Search Input */}

      {/* Available Crops */}
      <CCard
        className="p-3 mb-4"
        style={{
          boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
          borderRadius: "10px",
        }}
      >
        <CCardBody>
          <CFormInput
            type="text"
            placeholder="🔍 Search for a crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4"
            style={{ padding: "12px", fontSize: "16px", borderRadius: "8px" }}
          />
          <CRow className="g-2">
            {availableCrops
              .filter(
                (crop) =>
                  crop.toLowerCase().includes(search.toLowerCase()) &&
                  !crops.some(
                    (selected) =>
                      selected.title.toLowerCase() === crop.toLowerCase()
                  )
              )
              .map((crop, index) => (
                <CCol key={index} xs={12} sm={6} md={4}>
                  <CButton
                    color="primary"
                    variant="outline"
                    className="w-100"
                    onClick={() => handleOpenModal(crop)}
                    style={{ padding: "10px", fontSize: "16px" }}
                  >
                    {crop}
                  </CButton>
                </CCol>
              ))}
          </CRow>
        </CCardBody>
      </CCard>

      {/* Selected Crops */}
      {crops.length > 0 && (
        <CCard
          className="p-3"
          style={{
            boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "10px",
          }}
        >
          <CCardBody>
            <CCardTitle
              className="mb-3"
              style={{
                textAlign: "center",
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
            >
              Selected Crops
            </CCardTitle>
            <CRow className="g-3">
              {crops.map((crop, index) => (
                <CCol key={index} xs={12} sm={6} md={4}>
                  <CropTile {...crop} onHandleHarvest={onHandleHarvest} />
                </CCol>
              ))}
            </CRow>
          </CCardBody>
        </CCard>
      )}

      {/* Modal for Crop Proportion Selection */}
      <CModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        centered
      >
        <CModalHeader>
          <strong>Set Crop Proportion</strong>
        </CModalHeader>
        <CModalBody>
          <CFormLabel htmlFor="crop-proportion">
            Proportion: <strong>{proportion}%</strong>
          </CFormLabel>
          <CFormRange
            id="crop-proportion"
            min={0}
            max={availableProportion}
            value={proportion}
            onChange={(e) => setProportion(Number(e.target.value))}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="success" onClick={handleConfirmSelection}>
            Confirm
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default CropList;
