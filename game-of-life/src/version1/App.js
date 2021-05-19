import React, { Component, useState } from 'react';
import { gosperGliderGun, simkinGliderGun, spaceships, pulsar } from './components/presets';
import '../css/App.css';

import About from './components/about';
import Rules from './components/rules';
import Navbar from './components/navbar';
import { UVs } from './components/utils';
import { BoardGrid, MiniBoard, newBoardStatus, newMiniBoardStatus } from './components/boards';
import { TimeSlider, WidthBoardSlider, HeightBoardSlider } from './components/sliders';

class App extends Component {
	state = {
		boardStatus: newBoardStatus(),
		miniBoardStatus: newMiniBoardStatus(),
		presetBoardStatus: {

		},
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
					const isNeighborOnBoard = (x >= 0 && x < UVs.universalRows && y >= 0 && y < UVs.universalColumns);
					/* No need to count more than 4 alive neighbors due to rules */
					if (trueNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
						return trueNeighbors + 1;
					} else {
						return trueNeighbors;
					}
				}, 0);
			};

			for (let r = 0; r < UVs.universalRows; r++) {
				for (let c = 0; c < UVs.universalColumns; c++) {
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
		console.log('HAS SPEED CHANGED', speedChanged);
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
		const { boardStatus, miniBoardStatus, isGameRunning, generation, speed, height, width } = this.state;

    	return (
    		<div className='App'>
				<Navbar />
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
						<div>
							<About />
							<Rules />
						</div>
					</div>
				</div>
				<div className='flexRow upperControls'>
					<span>
						{'Speed + '}
						<TimeSlider speed={speed} onSpeedChange={this.handleSpeedChange} />
						{' -'}

						{/* ===== WIDTH AND HEIGHT SLIDERS ===== */}
						{'Width + '}
						<WidthBoardSlider width={width} onWidthChange={this.handleWidthChange} />
						{' -'}
						{'Height + '}
						<HeightBoardSlider height={height} onHeightChange={this.handleHeightChange} />
						{' -'}
						{/* ===== WIDTH AND HEIGHT SLIDERS ===== */}
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