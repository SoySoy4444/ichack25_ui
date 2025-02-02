import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Results = ({ route }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const results = JSON.parse(queryParams.get("results") || "[]"); // Parse JSON
    
    // Example statistics (these will be replaced by actual simulation data)
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Simulation Results</h1>

            <div style={styles.statsContainer}>
                <table style={styles.table}>
                    <tbody>
                        {Object.entries(results).map(([key, value]) => (
                            <tr key={key}>
                                <td style={styles.label}>{`Yield for ${key}%`}</td>
                                <td style={styles.value}>{value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={() => navigate("/")} style={styles.button}>Back to Simulator</button>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
    },
    heading: {
        fontSize: "2rem",
        marginBottom: "20px",
        color: "#333",
    },
    statsContainer: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
    },
    label: {
        textAlign: "left",
        padding: "10px",
        fontWeight: "bold",
        borderBottom: "1px solid #ddd",
        color: "#555",
    },
    value: {
        textAlign: "right",
        padding: "10px",
        borderBottom: "1px solid #ddd",
        color: "#222",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        fontSize: "16px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "0.3s",
    },
};

export default Results;
