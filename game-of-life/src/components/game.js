import React, { Component } from 'react';
import {presetLine, gosperGliderGunPreset, pulsarPreset, lineSegmentsPreset, simkinGliderGunPreset, honeycombPreset} from './presets'
import gosperTIMG from '../images/gosperTIMG.jpg'
import simkinTIMG from '../images/simkinTIMG.jpg'
import lineTIMG from '../images/lineTIMG.jpg'
import lineSegTIMG from '../images/lineSegmentTIMG.jpg'
import pulsarTIMG from '../images/pulsarTIMG.jpg'
import honeycombTIMG from '../images/honeycombTIMG.jpg'
import '../css/App.css';

export let totalBoardRows = 125;
export let totalBoardColumns = 125;
export const universalRows = totalBoardRows + 25;
export const universalColumns = totalBoardColumns + 25;

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
	for (let r = 25; r < totalBoardRows; r++) {
  		const td = [];
  		for (let c = 25; c < totalBoardColumns; c++) {
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

const TimeSlider = ({ speed, onSpeedChange }) => {
	const handleChange = e => {
		onSpeedChange(e.target.value)
	};

	return (
		<input
			className='slider'
			type='range'
			max='1000'
			min='0.1'
			step='0.1'
			value={speed}
			onChange={handleChange}
		/>
	);
};




class Game extends Component {
	state = {
		boardStatus: newBoardStatus(),
		generation: 0,
		isGameRunning: false,
		speed: 500,
		width: 70,
		height: 50
	};

	runStopButton = () => {
		return this.state.isGameRunning ?
			<button type='button' className={`${this.state.isGameRunning ? 'button-active' : 'button-inactive'}`} onClick={this.handleStop}>Stop</button> :
			<button type='button' className={`${!this.state.isGameRunning ? 'button-active' : 'button-inactive'}`}onClick={this.handleRun}>Start</button>;
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

	handleLinePreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: presetLine(),
			generation: 0
		});
	}

	handleGliderGunPreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: gosperGliderGunPreset(),
			generation: 0
		});
	}

	handlePulsarPreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: pulsarPreset(),
			generation: 0
		});
	}

	handleLineSegmentsPreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: lineSegmentsPreset(),
			generation: 0
		});
	}

	handleSimkinGunPreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: simkinGliderGunPreset(),
			generation: 0
		});
	}

	handleHoneycombPreset = () => {
		this.setState({
			isGameRunning: false,
			boardStatus: honeycombPreset(),
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
		
			const clonedBoardStatus = JSON.parse(JSON.stringify(boardStatus));
			
			const getAliveNeighbors = (r,c) => {
				
				const neighbors = [
					[1,-1], 
					[1,0], 
					[1,1], 
					[0,-1], 
					[0,1], 
					[-1,-1], 
					[-1,0], 
					[-1,1]
				];

				return neighbors.reduce((aliveNeighbors, neighbor) => {
					const x = r + neighbor[0];
					const y = c + neighbor[1];

					const isNeighborOnBoard = (x >= 0 && x < universalRows && y >= 0 && y < universalColumns);

					if (aliveNeighbors < 4 && isNeighborOnBoard && boardStatus[x][y]) {
						return aliveNeighbors + 1;
					} else {
						return aliveNeighbors;
					}
				}, 0);

			};

			for (let r = 0; r < universalRows; r++) {
				for (let c = 0; c < universalColumns; c++) {
					const AliveNeighbors = getAliveNeighbors(r,c);

					if (!boardStatus[r][c]) {
						if (AliveNeighbors === 3) clonedBoardStatus[r][c] = true;
					} else {
						if (AliveNeighbors < 2 || AliveNeighbors > 3) clonedBoardStatus[r][c] = false;
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
				<div className='extra'>
					<div className='flexRow boardLevel'>
						<div className='flexRow presets'>
							<h3>Presets</h3>
							<div className='presets-wrapper'>
								<div>
									<div className='miniBoards' onClick={this.handleGliderGunPreset}>
										<img src={gosperTIMG} alt='gosper glider gun preset' />
									</div>
									<h4>Gosper Glider Gun</h4>
								</div>
								
								<div>
									<div className='miniBoards' onClick={this.handleHoneycombPreset}> 
										<img src={honeycombTIMG} alt='honeycomb preset' /> 		
									</div>
									<h4>Hooneycomb</h4>
								</div>

								<div>
									<div className='miniBoards' onClick={this.handleLinePreset}> 
										<img src={lineTIMG} alt='line preset' /> 
									</div>
									<h5>Line</h5>
								</div>
							</div>
						</div>
					
						<div className='board-wrapper'>
							<BoardGrid boardStatus={boardStatus} onToggleCellStatus={this.handleToggleCellStatus} />
						</div>
						<div className='flexRow presets'>
							<h3>Presets</h3>
							<div className='presets-wrapper'>

								<div>
									<div className='miniBoards' onClick={this.handleLineSegmentsPreset}> 
										<img src={lineSegTIMG} alt='line segment preset' /> 
									</div>
									<h4>Line Segments</h4>
								</div>

								<div>
									<div className='miniBoards' onClick={this.handlePulsarPreset}> 
										<img src={pulsarTIMG} alt='pulsar preset' /> 		
									</div>
									<h4>Pulsar</h4>
								</div>

								<div>
									<div className='miniBoards' onClick={this.handleSimkinGunPreset}> 
										<img src={simkinTIMG} alt='simkin glider gun preset' /> 
									</div>
									<h5>Simkin Glider Gun</h5>
								</div>

							</div>
						</div>
					</div>

				</div>
				
				<div className='controls'>
					<div className='slider-container'>
						<div className='slider-labels'>{'SLOWER '}</div>
						<TimeSlider speed={speed} onSpeedChange={this.handleSpeedChange} />
						<div className='slider-labels'>{' FASTER'}</div>
					</div>
					<div className='gen'>GENERATION: </div>
					<div className='gen-counter'>{`${generation}`}</div>
					<div>
						{this.runStopButton()}
						
						<button type='button' className={`${!isGameRunning ? 'button-active' : 'button-inactive'}`} disabled={isGameRunning} onClick={this.handleStep}>Step</button>
						
						<button type='button' className={`${!isGameRunning ? 'button-active' : 'button-inactive'}`} disabled={isGameRunning} onClick={this.handleClearBoard}>Clear</button>
						
						<button type='button' className={`${!isGameRunning ? 'button-active' : 'button-inactive'}`} disabled={isGameRunning} onClick={this.handleNewBoard}>Random</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;