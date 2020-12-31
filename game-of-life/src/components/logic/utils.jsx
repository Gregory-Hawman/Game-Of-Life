import React from 'react';

// ===== UNIVERSAL VARS ===== //
let vBR = 45;
let vBC = 60;

export const universalVars = {
	visibleBoardRows : vBR,
	visibleBoardColumns : vBC,
	universalRows : vBR + 50,
	universalColumns : vBC + 50,
	totalMiniBR : 6,
	totalMiniBC : 6
}
// ===== UNIVERSAL VARS ===== //

// ===== SLIDERS ===== //
export const TimeSlider = ({ speed, onSpeedChange }) => {
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
// ===== SLIDERS ===== //