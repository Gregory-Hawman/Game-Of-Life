import React from 'react';
import About from './components/about';
import Game from './components/game';
import Gameboy from './components/gameboy';
import GameboyAdv from './components/gb-adv';
import Rules from './components/rules';
import './css/App.css';
import './css/index.css';

function App2() {
    



    return (
        <>
            <div className='choices'>
                <h2><a>GameBoy</a></h2>
                <h2><a>GameBoy Advanced</a></h2>
            </div>
            
            <div>
                <Gameboy />
            </div>
            {/* <div>
                <GameboyAdv />
            </div> */}
        </>
    )
}

export default App2;