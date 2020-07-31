import React from 'react';
import About from './components/about';
import Game from './components/game';
import Rules from './components/rules';

function App() {
    return (
        <div>
            <div>
                <h1>Conway's Game of Life</h1>
            </div>
            <div>
                <Game />
            </div>
            <div>
                <About />
                <Rules />
            </div>
        </div>
    )
}

export default App2;