import React, { useState } from 'react';

import {newBoardStatus} from './logic/board';
import {newMiniBoardStatus} from './logic/miniBoard';
import Buttons from './buttons';
import Screen from './screen'
import Title from './title';

import '../css/index.css'
 
function Gameboy () {
      // ===== STATE ===== //
	const [boardStatus, setBoardStatus] = useState(newBoardStatus());
	const [miniBoardStatus, setMiniBoardStatus] = useState(newMiniBoardStatus());
	const [generation, setGeneration] = useState(0);
	const [isGameRunning, setIsGameRunning] = useState(false);
	const [speed, setSpeed] = useState(500);
	const [width, setWidth] = useState(70);
	const [height, setHeight] = useState(50);
	// ===== STATE ===== //

    return (
        <div className='gameboy'>
            <div className='screen-border'>
                <Screen />    
            </div>
            <div className='btn-half'>
                <Title />
                <Buttons />
            </div>
        </div>
    )
}

export default Gameboy