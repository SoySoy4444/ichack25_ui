// src/App.js
import React from "react";
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <h1>Farm Grid</h1>
      <Grid rows={5} cols={5} />
    </div>
  );
}

export default App;