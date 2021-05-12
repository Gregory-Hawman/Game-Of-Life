import React from 'react';

import { universalVars } from './utils';
import { gosperGliderGun, simkinGliderGun, spaceships, pulsar } from '../components/presets';
import '../../css/index.css';

const uv = universalVars;

// ===== PRESET BOARDS (WOULD LIKE TO SET THEM UP AS STAMPS) ===== //
const MiniBoard = ({ boardStatus, onToggleCellStatus }) => {
	// CLICK TO INIT PRESET
	// const handleClick = (r,c) => onToggleCellStatus(r,c);

	const tr = [];
	for (let r = 0; r < uv.totalMiniBR; r++) {
  		const td = [];
  		for (let c = 0; c < uv.totalMiniBC; c++) {
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

export const newMiniBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < uv.totalMiniBR; r++) {
		grid[r] = [];
		for (let c = 0; c < uv.totalMiniBC; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};
// ===== PRESET BOARDS (WOULD LIKE TO SET THEM UP AS STAMPS) ===== //