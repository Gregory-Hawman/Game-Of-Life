import React, { useEffect, useState, useRef } from 'react';

import { BoardGrid, newBoardStatus } from './board';
import { newMiniBoardStatus } from './miniBoard';
import { universalVars, TimeSlider } from './utils'
import '../../css/index.css';

const uv = universalVars;

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
		setIsGameRunning(true);
	};
	const handleStop = () => {
		setIsGameRunning(false);
	};
	// ===== STARTING STOPPING THE GAME =====  //

	// ===== CLEAR BOARD ===== //
	const handleClearBoard = () => {
      	setIsGameRunning(false);
      	setBoardStatus(newBoardStatus(() => false));
		setGeneration(0)
	};
	// ===== CLEAR BOARD ===== //

	// ===== NEW BOARD ===== //
	const handleNewBoard = () => {
      	setIsGameRunning(false);
		setBoardStatus(newBoardStatus());
		setGeneration(0);
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
			setBoardStatus(toggleBoardStatus(boardStatus));
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
					const isNeighborOnBoard = (x >= 0 && x < uv.universalRows && y >= 0 && y < uv.universalColumns);
					/* No need to count more than 4 alive neighbors due to rules */
					if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
						return trueNeighbors + 1;
					} else {
						return trueNeighbors;
					}
				}, 0);
			};

			for (let r = 0; r < uv.universalRows; r++) {
				for (let c = 0; c < uv.universalColumns; c++) {
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

			setBoardStatus(nextStep(boardStatus));
			setGeneration(generation + 1);
	};
	// ===== HANDLE SINGLE STEP ===== //

	// ===== SLIDERS ===== //
	const handleSpeedChange = newSpeed => {
		setSpeed(newSpeed);
	};

	const handleWidthChange = newWidth => {
		setWidth(newWidth);
	};

	const handleHeightChange = newHeight => {
		setHeight(newHeight);
	};
	// ===== SLIDERS ===== //
	
	// const prevSpeedRef = useRef();
	// console.log('SPEED REF', prevSpeedRef)

	// prevSpeedRef.current = speed;

	// const prevSpeed = Number(prevSpeedRef.current)
	// console.log('PREV SPEED', prevSpeed)

	useEffect(() => {
		const handleSpeedChange = newSpeed => {
			setSpeed(newSpeed);
		};
		
		// // const speedChanged = prevSpeed !== speed;
		// // console.log('HAS SPEED CHANGED', speedChanged);
		// // console.log('SPEED', Number(speed));

		// const gameStarted = !prevState.isGameRunning && isGameRunning;
		// const gameStopped = prevState.isGameRunning && !isGameRunning;

		// if ((isGameRunning && speedChanged) || gameStopped) {
		// 	clearInterval(this.timerID);
		// }

		// if ((isGameRunning && speedChanged) || gameStarted) {
		// 	this.timerID = setInterval(() => {
		// 		handleStep();
		// 	}, speed);
		// }
	},[speed, isGameRunning])

    return (
        <div className='game'>
			<BoardGrid boardStatus={boardStatus} onToggleCellStatus={handleToggleCellStatus} />
			{`Generation: ${generation}`}
			<div className='flexRow lowerControls'>
				{startStopButton()}
				<button type='button' disabled={isGameRunning} onClick={handleStep}>Step</button>
				<button type='button' onClick={handleClearBoard}>Clear Board</button>
				<button type='button' onClick={handleNewBoard}>Random Board</button>
				{'+ '}
				<TimeSlider speed={speed} onSpeedChange={handleSpeedChange} />
				{' -'}
			</div>
        </div>
    )
}

export default Game