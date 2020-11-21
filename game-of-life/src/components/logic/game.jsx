import React, { useState, Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from '../presets';
import '../../css/index.css';

// ===== UNIVERSAL VARS ===== //
let totalBoardRows = 50;
let totalBoardColumns = 70;
const universalRows = totalBoardRows + 50;
const universalColumns = totalBoardColumns + 50;
const totalMiniBR = 6;
const totalMiniBC = 6;
// ===== UNIVERSAL VARS ===== //

// ===== BOARD ===== //
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
// ===== BOARD ===== //

// ===== PRESET BOARDS (WOULD LIKE TO SET THEM UP AS STAMPS) ===== //
const MiniBoard = ({ boardStatus, onToggleCellStatus }) => {
	// CLICK TO INIT PRESET
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
// ===== PRESET BOARDS (WOULD LIKE TO SET THEM UP AS STAMPS) ===== //

// ===== SLIDERS ===== //
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
// ===== SLIDERS ===== //

function Game () {
	// ===== STATE ===== //
	const [boardStatus, setBoardStatus] = useState(newBoardStatus());
	const [miniBoardStatus, setMiniBoardStatus] = useState(newMiniBoardStatus());
	const [generation, setGeneration] = useState(0);
	const [isGameRunning, setIsGameRunning] = useState(false);
	const [speed, setSpeed] = useState(500);
	const [width, setWidth] = useState(70);
	const [height, setHeight] = useState(50);
	// ===== STATE ===== //

	// ===== STARTING STOPPING THE GAME ===== //
	// This will be handled by the start/select buttons 
	const startStopButton = () => {
		return isGameRunning ?
			<button type='button' onClick={handleStop}>Stop</button> :
			<button type='button' onClick={handleStart}>Start</button>
	};
	const handleStart = () => {
		setIsGameRunning = true;
	};
	const handleStop = () => {
		setIsGameRunning = false;
	};
	// ===== STARTING STOPPING THE GAME =====  //

	// ===== CLEAR BOARD ===== //
	const handleClearBoard = () => {
      	setIsGameRunning = false;
      	setBoardStatus = newBoardStatus(() => false);
		setGeneration = 0
	};
	// ===== CLEAR BOARD ===== //

	// ===== NEW BOARD ===== //
	const handleNewBoard = () => {
      	setIsGameRunning = false;
		setBoardStatus = newBoardStatus();
		setGeneration = 0;
	};
	// ===== NEW BOARD ===== //

	// ===== CELL STATUS ===== //
	const handleToggleCellStatus = (r,c) => {
		if(isGameRunning === false) {
			const toggleBoardStatus = () => {
				const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
				clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
				return clonedBoardStatus;
	    	};
			setBoardStatus = toggleBoardStatus(boardStatus);
		} else {
			return;
		};
	};
	// ===== CELL STATUS ===== //

	// ===== HANDLE SINGLE STEP ===== //
	const handleStep = () => {
		const nextStep = () => {
			const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));

			const amountTrueNeighbors = (r,c) => {
				const neighbors = [
				[1,-1],   [1,0],  [1,1],
				[0,-1], /*[0,0]*/ [0,1], 
				[-1,-1],  [-1,0], [-1,1]
				// [0, 0] would be in the middle of this "matrix" but it's the current cell, not a neighbor.
				];
				return neighbors.reduce((trueNeighbors, neighbor) => {
					const x = r + neighbor[0];
					const y = c + neighbor[1];
					const isNeighborOnBoard = (x >= 0 && x < universalRows && y >= 0 && y < universalColumns);
					/* No need to count more than 4 alive neighbors due to rules */
					if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
						return trueNeighbors + 1;
					} else {
						return trueNeighbors;
					}
				}, 0);
			};

			for (let r = 0; r < universalRows; r++) {
				for (let c = 0; c < universalColumns; c++) {
					const totalTrueNeighbors = amountTrueNeighbors(r,c);

					if (!boardStatus[r][c]) {
						if (totalTrueNeighbors === 3) clonedBoardStatus[r][c] = true;
					} else {
						if (totalTrueNeighbors < 2 || totalTrueNeighbors > 3) clonedBoardStatus[r][c] = false;
					}
				}
			};

			return clonedBoardStatus;
		};
			let setBoardStatus = nextStep(boardStatus);
			let setGeneration = generation + 1;
	};
	// ===== HANDLE SINGLE STEP ===== //

	// ===== SLIDERS ===== //
	const handleSpeedChange = newSpeed => {
		setSpeed = newSpeed;
	};

	const handleWidthChange = newWidth => {
		setWidth = newWidth;
	};

	const handleHeightChange = newHeight => {
		setHeight = newHeight;
	};
	// ===== SLIDERS ===== //

    return (
        <div className='screen'>
			<div>
				<div className='header'>
					<h1>Conway's Game of Life</h1>
				</div>
				<div className='flexRow boardLevel'>
					<BoardGrid boardStatus={boardStatus} onToggleCellStatus={handleToggleCellStatus} />
					<div className='flexRow textBoxes'>
						<div>
							<h3>Presets</h3>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => BoardGrid({gosperGliderGun})} /> <h4>Gosper Glider Gun</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => handleStep(simkinGliderGun)} /> <h4>Simkin Glider Gun</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => handleStep(spaceships)} /> <h4>Pulsar</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => handleStep(pulsar)} /> <h4>3 Spaceships</h4> </div>
						</div>
						<div className='rules'>
							<p>
								<a>Conway's Game of Life</a> is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
							</p>
							<h3>Rules</h3>
							<ul>
								<li>Any live cell with fewer than two live neighbors dies, as if by under-population.</li>
								<br/>
								<li>Any live cell with two or three live neighbors lives on to the next generation.</li>
								<br/>
								<li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
								<br/>
								<li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
							</ul>
						</div>
					</div>
				</div>
				<div className='flexRow upperControls'>
					<span>
						{'+ '}
						<TimeSlider speed={speed} onSpeedChange={handleSpeedChange} />
						{' -'}
						{'+ '}
						<WidthGraphSlider width={width} onWidthChange={handleWidthChange} />
						{' -'}
						{'+ '}
						<HeightGraphSlider height={height} onHeightChange={handleHeightChange} />
						{' -'}
					</span>
					<span>
						<input value={width} onChange={handleWidthChange}/>
						<input value={height} onChange={handleHeightChange}/>
					</span>
					{`Generation: ${generation}`}
				</div>
				<div className='flexRow lowerControls'>
					{startStopButton()}
					<button type='button' disabled={isGameRunning} onClick={handleStep}>Step</button>
					<button type='button' onClick={handleClearBoard}>Clear Board</button>
					<button type='button' onClick={handleNewBoard}>Random Board</button>
				</div>
			</div>
        </div>
    )
}

export default Game