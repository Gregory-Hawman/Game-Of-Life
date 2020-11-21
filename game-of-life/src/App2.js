import React from 'react';
import Gameboy from './components/gameboy';

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