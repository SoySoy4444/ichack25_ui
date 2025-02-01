import React, { useState } from "react";

const Menu = ({ mode, setMode, resetGrid }) => {
  const [expanded, setExpanded] = useState(false);

  const options = [
    { name: "crop", icon: "🌾", color: "lightgreen" },
    { name: "fence", icon: "🚧", color: "lightcoral" },
    { name: "delete", icon: "❌", color: "lightblue" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        background: "#333",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        transition: "width 0.2s ease-in-out",
        minWidth: "50px",
        cursor: "pointer",
        padding: "5px",
      }}
    >
      {/* Hoe Icon - Click to Expand */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "15px",
          cursor: "pointer",
          alignSelf: "center",
          color: "white",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        Edit
      </button>

      {/* Expandable Options */}
      {expanded && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {options.map(({ name, icon, color }) => (
            <button
              key={name}
              onClick={() => setMode(name)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                cursor: "pointer",
                borderRadius: "50%",
                fontSize: "20px",
                background: mode === name ? color : "transparent",
                border: mode === name ? `2px solid ${color}` : "none",
                color: mode === name ? "black" : "white",
                transition:
                  "background 0.2s ease-in-out, border 0.2s ease-in-out",
              }}
            >
              {icon}
            </button>
          ))}
          {/* Reset Button */}
          <button
            onClick={resetGrid}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              borderRadius: "50%",
              fontSize: "20px",
              background: "transparent",
              color: "white",
              transition:
                "background 0.2s ease-in-out, border 0.2s ease-in-out",
            }}
          >
            🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
