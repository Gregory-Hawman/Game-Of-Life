import React, { Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from '../components/presets';
import '../css/index.css';

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

function Game () {
    return (
        <div className='screen'>

        </div>
    )
}

export default Game