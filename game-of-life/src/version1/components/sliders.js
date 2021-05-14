import React from 'react';

// CHANGE WIDTH AND HEIGHT OF BOARD
// const totalBoardColumns = ({ width, onWidthChange }) => {
// 	const handleChange = e => onWidthChange(e.target.value);

// 	return (
// 		<input 
// 			type='integer'
// 			default='40'
// 			max='1000'
// 			min='25'
// 			value={width}
// 			onChange={handleChange}
// 		/>
// 	);
// };
// const totalBoardRows = ({ height, onHeightChange }) => {
// 	const handleChange = e => onHeightChange(e.target.value);
	
// 	return (
// 		<input 
// 			type='integer'
// 			default='60'
// 			max='1000'
// 			min='25'
// 			value={height}
// 			onChange={handleChange}
// 		/>
// 	);
// };

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

export const WidthGraphSlider = ({ totalBoardColumns, onWidthChange }) => {
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

export const HeightGraphSlider = (totalBoardRows, { onHeightChange }) => {
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