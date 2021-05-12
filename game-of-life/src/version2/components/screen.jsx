import React from 'react';
import { Route } from 'react-router-dom';
import { useState } from 'react';

import Game from '../logic/game';
import About from './about';
import Rules from './rules';
import Controls from './controls';
import {defaultPreset, gosperGliderGun} from './presets';
import OnScreenButtons from './OnScreenButtons';

import '../../css/index.css';

function Logo () {
    return (
        <div className='logo'>
            <h1>CONWAY'S</h1>
			<h2>GAME OF LIFE</h2>
        </div>
    )
}

function Screen () {

    return (
        <div className='screen'>
            <Route exact path='/'>
                <Logo />
            </Route>
            <Route path='/game'>
                <Game />
            </Route>
            <Route path='/about'>
                <About />
            </Route>
            <Route path='/rules'>
                <Rules />
            </Route>
            <Route path='/controls'>
                <Controls />
            </Route>
            <Route path='/presets'>
                <defaultPreset />
            </Route>
            
            <OnScreenButtons />
        </div>
    )
}

export default Screen