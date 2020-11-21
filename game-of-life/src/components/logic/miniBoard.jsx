import React, { Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from './components/presets'
import './css/App.css';

const newMiniBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < totalMiniBR; r++) {
		grid[r] = [];
		for (let c = 0; c < totalMiniBC; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};

const MiniBoardGrid = ({ boardStatus, onToggleCellStatus }) => {
	// const handleClick = (r,c) => onToggleCellStatus(r,c);

	const tr = [];
	for (let r = 0; r < totalMiniBR; r++) {
  		const td = [];
  		for (let c = 0; c < totalMiniBC; c++) {
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