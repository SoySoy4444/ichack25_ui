// src/components/Grid.js
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Grid = () => {
    const navigate = useNavigate();
    const rows = 30;
    const cols = 30;
    const cellSize = 30; 
    const totalCells = rows * cols;

    // State for grid, mode, and drag interaction
    const [grid, setGrid] = useState(Array(totalCells).fill(null));
    const [savedGrid, setSavedGrid] = useState(Array(totalCells).fill(null));
    const [mode, setMode] = useState("crop"); // 'crop', 'fence', or 'delete'
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState(null);

    // Convert 2D (row, col) to 1D index
    const getIndex = (row, col) => row * cols + col;

    const goToResultPage = () => navigate("/result");

    // Handle cell click or drag
    const handleCellAction = (row, col) => {
        const index = getIndex(row, col);
        const newGrid = [...grid];
        if (mode === "delete") {
            newGrid[index] = null; // Clear the cell
        } else {
            newGrid[index] = mode === "crop" ? "crop" : "fence"; // Set crop or fence
        }
        setGrid(newGrid);
    };

    // Handle mouse down (start dragging)
    const handleMouseDown = (row, col) => {
        setIsDragging(true);
        setStartCell({ row, col });
        handleCellAction(row, col);
    };

    // Handle mouse enter (while dragging)
    const handleMouseEnter = (row, col) => {
        if (isDragging && startCell) {
            const minRow = Math.min(startCell.row, row);
            const maxRow = Math.max(startCell.row, row);
            const minCol = Math.min(startCell.col, col);
            const maxCol = Math.max(startCell.col, col);

            const newGrid = [...savedGrid];

            if (mode === "fence") {
                // Draw a fence line
                if (maxRow - minRow < maxCol - minCol) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const index = getIndex(startCell.row, c);
                        newGrid[index] = "fence";
                    }
                } else {
                    for (let r = minRow; r <= maxRow; r++) {
                        const index = getIndex(r, startCell.col);
                        newGrid[index] = "fence";
                    }
                }
            } else {
                for (let r = minRow; r <= maxRow; r++) {
                    for (let c = minCol; c <= maxCol; c++) {
                        const index = getIndex(r, c);
                        if (mode === "delete") {
                            newGrid[index] = null; // Clear the cell
                        } else {
                            newGrid[index] = mode === "crop" ? "crop" : "fence"; // Set crop or fence
                        }
                    }
                }
            }

            setGrid(newGrid);
            if (mode === "delete") {
                setSavedGrid(newGrid); // Save the current grid state
            }
        }
    };

    // Handle mouse up (stop dragging)
    const handleMouseUp = () => {
        setIsDragging(false);
        setStartCell(null);
        setSavedGrid([...grid]); // Save the current grid state
    };

    const handleDoubleClick = (row, col) => {
        if (mode !== "crop") {
            return;
        }

        // Flood fill the crop area
        const index = getIndex(row, col);
        const newGrid = [...grid];
        const visited = new Array(totalCells).fill(false);
        const queue = [index];
        while (queue.length > 0) {
            console.log(queue);
            const current = queue.shift();
            const r = Math.floor(current / cols);
            const c = current % cols;
            if (r < 0 || r >= rows || c < 0 || c >= cols || newGrid[current] === "fence") {
                continue;
            }

            newGrid[current] = "crop";
            for (const dir of [-cols, cols, -1, 1]) {
                const next = current + dir;
                if (!visited[next]) {
                    queue.push(next);
                    visited[next] = true;
                }
            }

            console.log(newGrid);
        }

        setGrid(newGrid);
        setSavedGrid(newGrid);
    }

    // Reset the grid
    const resetGrid = () => {
        const newGrid = Array(totalCells).fill(null);
        setGrid(newGrid);
        setSavedGrid(newGrid);
    };

    // Memoize the grid rendering for better performance
    const renderedGrid = useMemo(() => {
        return grid.map((cell, index) => {
            const row = Math.floor(index / cols);
            const col = index % cols;
            return (
                <div
                    key={index}
                    style={{
                        backgroundColor:
                            cell === "fence"
                                ? "brown"
                                : cell === "crop"
                                    ? "lightgreen"
                                    : "#f0f0f0",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                    }}
                    onMouseDown={() => handleMouseDown(row, col)}
                    onMouseEnter={() => handleMouseEnter(row, col)}
                    onDoubleClick={() => handleDoubleClick(row, col)}
                    aria-label={`Cell ${row}-${col}: ${cell || "empty"}`}
                />
            );
        });
    }, [grid, handleMouseDown, handleMouseEnter]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ marginBottom: "15px", display: "flex", gap: "10px" }}>
                {["crop", "fence", "delete"].map((m) => (
                    <button
                        key={m}
                        onClick={() => setMode(m)}
                        style={{
                            padding: "10px 15px",
                            backgroundColor: mode === m ? "#555" : "#ddd",
                            color: "white",
                            cursor: "pointer",
                            border: "none",
                            borderRadius: "5px",
                            transition: "0.3s",
                        }}
                    >
                        {m.charAt(0).toUpperCase() + m.slice(1)} Mode
                    </button>
                ))}
                <button onClick={resetGrid} style={{ padding: "10px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Reset</button>
                <button onClick={goToResultPage} style={{ padding: "10px 15px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Go to Result</button>
            </div>
            <div
                style={{
                    display: "grid",
                    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
                    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
                    border: "2px solid black",
                }}
                onMouseUp={handleMouseUp}
            >
                {renderedGrid}
            </div>
        </div>
    );
};

export default Grid;