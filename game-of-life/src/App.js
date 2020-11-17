import React, { Component } from 'react';
import {gosperGliderGun, simkinGliderGun, spaceships, pulsar } from './components/presets'
import './css/App.css';


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

// const presetBoardStatus = () => {
// 	const grid = [];
// 	for (let r = 0; r < totalBoardRows; r++) {
// 		grid[r] = [];
// 		for (let c = 0; c < totalBoardColumns; c++) {
// 			grid[r][c] = cellStatus();
// 		}
// 	}
// 	return grid;
// };

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

const MiniBoard = ({ boardStatus, onToggleCellStatus }) => {
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


class App extends Component {
	state = {
		boardStatus: newBoardStatus(),
		miniBoardStatus: newMiniBoardStatus(),
		generation: 0,
		isGameRunning: false,
		speed: 500,
		width: 70,
		height: 50
	};

	runStopButton = () => {
		return this.state.isGameRunning ?
			<button type='button' onClick={this.handleStop}>Stop</button> :
			<button type='button' onClick={this.handleRun}>Start</button>;
	}

	handleClearBoard = () => {
		this.setState({
      		isGameRunning: false,
      		boardStatus: newBoardStatus(() => false),
			generation: 0
		});
	}

	handleNewBoard = () => {
		this.setState({
      		isGameRunning: false,
			boardStatus: newBoardStatus(),
			generation: 0
		});
	}

	handleToggleCellStatus = (r,c) => {
		if(this.state.isGameRunning === false) {
			const toggleBoardStatus = prevState => {
				const clonedBoardStatus = JSON.parse(JSON.stringify(prevState.boardStatus));
				clonedBoardStatus[r][c] = !clonedBoardStatus[r][c];
				return clonedBoardStatus;
	    	};

			this.setState(prevState => ({
			boardStatus: toggleBoardStatus(prevState)
			}));
		} else {
			return;
		};
	}

	handleStep = () => {
		const nextStep = prevState => {
			const boardStatus = prevState.boardStatus;

			/* Must deep clone boardStatus to avoid modifying it by reference when updating clonedBoardStatus.
			Can't use `const clonedBoardStatus = [...boardStatus]`
			because Spread syntax effectively goes one level deep while copying an array. 
			Therefore, it may be unsuitable for copying multidimensional arrays.
			Note: JSON.parse(JSON.stringify(obj)) doesn't work if the cloned object uses functions */
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
			}

			return clonedBoardStatus;
		};

		this.setState(prevState => ({
			boardStatus: nextStep(prevState),
			generation: prevState.generation + 1
		}));
	}

	handleSpeedChange = newSpeed => {
		this.setState({ speed: newSpeed });
	}

	handleWidthChange = newWidth => {
		this.setState({ width: newWidth });
	}

	handleHeightChange = newHeight => {
		this.setState({ height: newHeight });
	}

	handleRun = () => {
		this.setState({ isGameRunning: true });
	}

	handleStop = () => {
		this.setState({ isGameRunning: false });
	}

	componentDidUpdate(prevProps, prevState) {
		const { isGameRunning, speed } = this.state;
		const speedChanged = prevState.speed !== speed;
		const gameStarted = !prevState.isGameRunning && isGameRunning;
		const gameStopped = prevState.isGameRunning && !isGameRunning;

		if ((isGameRunning && speedChanged) || gameStopped) {
			clearInterval(this.timerID);
		}

		if ((isGameRunning && speedChanged) || gameStarted) {
			this.timerID = setInterval(() => {
				this.handleStep();
			}, speed);
		}
	}

	render() {
		const { boardStatus, miniBoardStatus, isGameRunning, generation, speed } = this.state;

    	return (
    		<div>
				<div className='header'>
					<h1>Conway's Game of Life</h1>
				</div>
				<div className='flexRow boardLevel'>
					<BoardGrid boardStatus={boardStatus} onToggleCellStatus={this.handleToggleCellStatus} />
					<div className='flexRow textBoxes'>
						<div>
							<h3>Presets</h3>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => this.BoardGrid({gosperGliderGun})} /> <h4>Gosper Glider Gun</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => this.handleStep(simkinGliderGun)} /> <h4>Simkin Glider Gun</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => this.handleStep(spaceships)} /> <h4>Pulsar</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={miniBoardStatus} onClick={() => this.handleStep(pulsar)} /> <h4>3 Spaceships</h4> </div>
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
						<TimeSlider speed={speed} onSpeedChange={this.handleSpeedChange} />
						{' -'}
						{'+ '}
						<WidthGraphSlider width={this.state.width} onWidthChange={this.handleWidthChange} />
						{' -'}
						{'+ '}
						<HeightGraphSlider height={this.state.height} onHeightChange={this.handleHeightChange} />
						{' -'}
					</span>
					<span>
						<input value={this.state.width} onChange={this.handleWidthChange}/>
						<input value={this.state.height} onChange={this.handleHeightChange}/>
					</span>
					{`Generation: ${generation}`}
				</div>
				<div className='flexRow lowerControls'>
					{this.runStopButton()}
					<button type='button' disabled={isGameRunning} onClick={this.handleStep}>Step</button>
					<button type='button' onClick={this.handleClearBoard}>Clear Board</button>
					<button type='button' onClick={this.handleNewBoard}>Random Board</button>
				</div>
			</div>
		);
	}
}

export default App;