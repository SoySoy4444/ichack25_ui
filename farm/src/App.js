import React from "react";
import Grid from "./components/Grid";

function App() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f4f4f4",
      fontFamily: "Arial, sans-serif",
    }}>
      <h1 style={{
        fontSize: "2rem",
        marginBottom: "15px",
        color: "#333",
        textShadow: "1px 1px 2px rgba(0,0,0,0.1)"
      }}>
        Farm Grid Simulator
      </h1>
      <Grid />
    </div>
  );
}

export default App;
