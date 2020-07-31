import React, {useState, useEffects, useCallback, useRef} from 'react'
import { gosperGliderGun, simkinGliderGun, spaceships, pulsar } from '../presets'


// Board rows
const boardRows = 50;
const boardColumns = 70;
// total rows so that the patterns can run off the screen
const totalRows = boardRows + 100;
const totalColumns = boardColumns + 100;

// Set it up like a matrix to help me visualize the neighbors
const neighbors = [
    [1,-1],   [1,0],  [1,1],
    [0,-1], /*[0,0]*/ [0,1], 
    [-1,-1],  [-1,0], [-1,1]
    ];

    const Board = () => {
        //states
        // initialize game board
        const [ grid, setGrid ] = useState(() => {
            return generateGrid();
        });
    
        // set the speed of the game
        const [ speed, setSpeed ] = useState(160)
    
        // log the generations
        const [ gen, setGen ] = useState(0);
    
        // sound effect when populating game board with cells
        // const sound = soundEffects[Math.floor(Math.random() * soundEffects.length)];
        // const [playSound] = useSound(sound, {volume: .2});
    
        // manage the current running state of the game board
        const [ running, setRunning ] = useState(false);
        const runningRef = useRef(running);
        runningRef.current = running;
    
        const runSim = useCallback(() => {
            if (!runningRef.current) {
                return;
            }
        
            // increment the generations as the game progresses
            setGen(g => g + 1)
    
            // cellular automata core functionality
            setGrid(g => {
                return produce(g, gridCopy => {
                    for (let i = 0; i < numRows; i++) {
                        for (let j = 0; j < numCols; j++) {
                            let neighbors = 0;   
                            
                            // check the game board for neighboring cells for the next generation
                            operations.forEach(([x, y]) => {
                                // wrap the cells around the edges of the game board
                                const newI = (i + x + numCols) % numCols;
                                const newJ = (j + y + numRows) % numRows;
                                if(newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                                    neighbors += g[newI][newJ]
                                }
                            })
    
                            // rules for cell life
                            if (neighbors < 2 || neighbors > 3) {
                                gridCopy[i][j] = 0;
                            } else if (g[i][j] === 0 && neighbors === 3) {
                                gridCopy[i][j] = 1;
                            }
                        }
                    }
                })
            })
    
            // set the timeout for each generation
            setTimeout(runSim, speed);
        }, [speed])

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
							<button className='miniBoards'> <MiniBoard boardStatus={gosperGliderGun} onClick={() => this.BoardGrid({gosperGliderGun})} /> <h4>Gosper Glider Gun</h4> </button>
							<div className='miniBoards'> <MiniBoard boardStatus={simkinGliderGun} onClick={() => this.handleStep(simkinGliderGun)} /> <h4>Simkin Glider Gun</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={spaceships} onClick={() => this.handleStep(spaceships)} /> <h4>Pulsar</h4> </div>
							<div className='miniBoards'> <MiniBoard boardStatus={pulsar} onClick={() => this.handleStep(pulsar)} /> <h4>3 Spaceships</h4> </div>
						</div>
						<div className='rules'>
							<p>
								<a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Conway's Game of Life</a> is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
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
						<Slider speed={speed} onSpeedChange={this.handleSpeedChange} />
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
    
    export default Board;