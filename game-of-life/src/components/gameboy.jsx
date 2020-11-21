import React from 'react';
import About from './about';
import Buttons from './buttons';
import Game from './logic/game';
import Rules from './rules';
import Title from './title';
import '../css/index.css'
 
function Gameboy () {
    return (
        <div className='gameboy'>
            <div className='screen-border'>
                <Game />    
            </div>
            <div className='btn-half'>
                <Title />
                <Buttons />
            </div>
        </div>
    )
}

export default Gameboy