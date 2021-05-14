import React from 'react';
import { UVs } from './utils';

// ===== GAME BOARD ===== //
export const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
	const handleClick = (r,c) => onToggleCellStatus(r,c);

	const tr = [];
	for (let r = 10; r < UVs.universalRows; r++) {
  		const td = [];
  		for (let c = 10; c < UVs.universalColumns; c++) {
    		td.push(
		        <td
		        	key={`${r},${c}`}
					className={boardStatus[r][c] ? 'alive' : 'dead'}
					onClick={() => handleClick(r,c)}
				/>
    		);
  		}
  		tr.push(<tr key={r}>{td}</tr>);
	}
	return <table><tbody>{tr}</tbody></table>;
};
// ===== GAME BOARD ===== //

// ===== NEW BOARD ===== //
export const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < UVs.universalRows; r++) {
		grid[r] = [];
		for (let c = 0; c < UVs.universalColumns; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};
// ===== NEW BOARD ===== //

// ===== SET THE BOARD PRESET PATTERNS ===== //
const presetBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < UVs.universalRows; r++) {
		grid[r] = [];
		for (let c = 0; c < UVs.universalRows; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};
// ===== SET THE BOARD PRESET PATTERNS ===== //

// ===== MINI BOARD ===== //
export const MiniBoard = ({ boardStatus, onToggleCellStatus }) => {
	// CLICK TO INIT PRESET
	// const handleClick = (r,c) => onToggleCellStatus(r,c);

	const tr = [];
	for (let r = 0; r < UVs.totalMiniBR; r++) {
  		const td = [];
  		for (let c = 0; c < UVs.totalMiniBC; c++) {
    		td.push(
		        <td
		        	key={`${r},${c}`}
					className={boardStatus[r][c] ? 'alive' : 'dead'}
					// onClick={() => handleClick(r,c)}
				/>
    		);
  		}
  		tr.push(<tr key={r}>{td}</tr>);
	}
	return <table><tbody>{tr}</tbody></table>;
};
// ===== MINI BOARD ===== //

// ===== NEW MINI BOARD ===== //
export const newMiniBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < UVs.totalMiniBR; r++) {
		grid[r] = [];
		for (let c = 0; c < UVs.totalMiniBC; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};
// ===== NEW BOARD ===== //