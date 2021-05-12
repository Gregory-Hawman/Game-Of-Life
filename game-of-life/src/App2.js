import React from 'react';
import { Route, Link } from 'react-router-dom';
import Gameboy from './version2/components/gameboy';
import GameboyAdv from './version2/components/gb-adv.jsx'

import './version2/css/App2.css';
import './version2/css/index.css';

function App2() {
    
    return (
        <>
            <Gameboy />
        </>
    )
}

export default App2;