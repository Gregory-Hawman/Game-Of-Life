import React, { Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from './components/presets'
import './css/App.css';

const TimeSlider = ({ speed, onSpeedChange }) => {
	const handleChange = e => onSpeedChange(e.target.value);

	return (
		<input
			type='range'
			max='1000'
			min='1'
			step='1'
			value={speed}
			onChange={handleChange}
		/>
	);
};

const WidthGraphSlider = ({ totalBoardColumns, onWidthChange }) => {
	const handleChange = e => onWidthChange(e.target.value);

	return (
		<input 
			type='range'
			max='500'
			min='25'
			step='1'
			value={totalBoardColumns}
			onChange={handleChange}
		/>
	);
};

const HeightGraphSlider = (totalBoardRows, { onHeightChange }) => {
	const handleChange = e => onHeightChange(e.target.value);

	return (
		<input 
			type='range'
			max='500'
			min='25'
			step='1'
			value={totalBoardRows}
			onChange={handleChange}
		/>
	);
};