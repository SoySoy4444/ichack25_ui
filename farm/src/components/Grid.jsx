import React, { useState } from "react";
import Cell from "./Cell";
import grassTile from "../assets/grass.png";
import Menu from "./Menu"; // Import the floating menu

const Grid = ({ rows = 30, cols = 30 }) => {
  const cellSize = 30;
  const borderSize = 1;
  const gridWithBorder = rows + 2 * borderSize;
  const colsWithBorder = cols + 2 * borderSize;
  const totalCells = rows * cols;

  const [grid, setGrid] = useState(Array(totalCells).fill(null));
  const [mode, setMode] = useState("crop");
  const [isDragging, setIsDragging] = useState(false);
  const [startCell, setStartCell] = useState(null);

  const getIndex = (row, col) => row * cols + col;

  const handleCellAction = (row, col) => {
    const index = getIndex(row, col);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[index] = mode === "delete" ? null : mode;
      return newGrid;
    });
  };

  const handleMouseDown = (row, col) => {
    setIsDragging(true);
    setStartCell({ row, col });
    handleCellAction(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (isDragging && startCell) {
      const minRow = Math.min(startCell.row, row);
      const maxRow = Math.max(startCell.row, row);
      const minCol = Math.min(startCell.col, col);
      const maxCol = Math.max(startCell.col, col);

      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];

        if (mode === "fence") {
          if (maxRow - minRow < maxCol - minCol) {
            for (let c = minCol; c <= maxCol; c++) {
              newGrid[getIndex(startCell.row, c)] = "fence";
            }
          } else {
            for (let r = minRow; r <= maxRow; r++) {
              newGrid[getIndex(r, startCell.col)] = "fence";
            }
          }
        } else {
          for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
              const index = getIndex(r, c);
              newGrid[index] = mode === "delete" ? null : mode;
            }
          }
        }
        return newGrid;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setStartCell(null);
  };

  const resetGrid = () => {
    setGrid(Array(totalCells).fill(null));
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px", // Space between grid and menu
        height: "100vh",
      }}
    >
      {/* Grid with Grass Border */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${gridWithBorder}, ${cellSize}px)`,
          gridTemplateColumns: `repeat(${colsWithBorder}, ${cellSize}px)`,
          gap: "0",
          backgroundColor: "#222", // Dark background for better contrast
          padding: "5px",
          borderRadius: "8px",
        }}
        onMouseUp={handleMouseUp}
      >
        {Array.from({ length: gridWithBorder * colsWithBorder }).map(
          (_, index) => {
            const row = Math.floor(index / colsWithBorder);
            const col = index % colsWithBorder;

            // Check if it's a grass tile (border area)
            const isGrass =
              row < borderSize ||
              row >= rows + borderSize ||
              col < borderSize ||
              col >= cols + borderSize;

            return isGrass ? (
              <div
                key={index}
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  backgroundImage: `url(${grassTile})`,
                  backgroundSize: "cover",
                }}
              />
            ) : (
              <Cell
                key={index}
                type={grid[getIndex(row - borderSize, col - borderSize)]}
                onMouseDown={() =>
                  handleMouseDown(row - borderSize, col - borderSize)
                }
                onMouseEnter={() =>
                  handleMouseEnter(row - borderSize, col - borderSize)
                }
              />
            );
          }
        )}
      </div>

      {/* Floating Menu on Right Side */}
      <Menu mode={mode} setMode={setMode} resetGrid={resetGrid} />
    </div>
  );
};

export default Grid;
