import React from 'react';

import { universalVars } from './utils';
import '../../css/App2.css';

const uv = universalVars

// ===== BOARD ===== //
export const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
	const handleClick = (r,c) => onToggleCellStatus(r,c);

	// rows array for the grid
	const tr = [];
	// loop through, r = 10 for that infinity pool look
	for (let r = 10; r < uv.visibleBoardRows; r++) {
		// in the first loop now make each row also have a column
  		const td = [];
  		for (let c = 10; c < uv.visibleBoardColumns; c++) {
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

export const newBoardStatus = (cellStatus = () => Math.random() < 0.2) => {
	const grid = [];
	for (let r = 0; r < uv.universalRows; r++) {
		grid[r] = [];
		for (let c = 0; c < uv.universalColumns; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};
// ===== BOARD ===== //