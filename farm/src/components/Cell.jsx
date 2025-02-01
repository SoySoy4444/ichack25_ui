import React from "react";

// Import local images
import defaultTile from "../assets/tile.png";
import cropTile from "../assets/alive.png";
import fenceTile from "../assets/fence_hor.png";

const Cell = ({ type, onMouseDown, onMouseEnter }) => {
  const getImageSrc = () => {
    switch (type) {
      case "crop":
        return cropTile;
      case "fence":
        return fenceTile;
      default:
        return defaultTile;
    }
  };

  return (
    <div
      style={{
        width: "30px",
        height: "30px",
        backgroundImage: `url(${getImageSrc()})`,
        backgroundSize: "cover",
        border: "none", // Removed border
        cursor: "pointer",
      }}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      aria-label={`Cell: ${type || "empty"}`}
    />
  );
};

export default Cell;
