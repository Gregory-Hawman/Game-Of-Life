import React from 'react';

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

export const WidthBoardSlider = ({ universalColumns, onWidthChange }) => {
	const handleChange = e => onWidthChange(e.target.value);

	return (
		<input 
			type='range'
			max='500'
			min='25'
			step='1'
			value={universalColumns}
			onChange={handleChange}
		/>
	);
};

export const HeightBoardSlider = ({ universalRows, onHeightChange }) => {
	const handleChange = e => onHeightChange(e.target.value);

	return (
		<input 
			type='range'
			max='500'
			min='25'
			step='1'
			value={universalRows}
			onChange={handleChange}
		/>
	);
};