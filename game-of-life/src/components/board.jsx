import React, { Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from './components/presets'
import './css/App.css';

let totalBoardRows = 50;
let totalBoardColumns = 70;
const universalRows = totalBoardRows + 50;
const universalColumns = totalBoardColumns + 50;
const totalMiniBR = 6;
const totalMiniBC = 6;

const newBoardStatus = (cellStatus = () => Math.random() < 0.3) => {
	const grid = [];
	for (let r = 0; r < universalRows; r++) {
		grid[r] = [];
		for (let c = 0; c < universalColumns; c++) {
			grid[r][c] = cellStatus();
		}
	}
	return grid;
};

const BoardGrid = ({ boardStatus, onToggleCellStatus }) => {
	const handleClick = (r,c) => onToggleCellStatus(r,c);

	const tr = [];
	for (let r = 10; r < totalBoardRows; r++) {
  		const td = [];
  		for (let c = 10; c < totalBoardColumns; c++) {
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