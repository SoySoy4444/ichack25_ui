import React from "react";
import Grid from "./components/Grid";

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <Grid rows={30} cols={40} />
    </div>
  );
}

export default App;
