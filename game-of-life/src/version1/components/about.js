import React from 'react';
import '../../css/index.css'
 
function About () {
    return (
        <div className='about-v1'>
            <h2>Conway's Game of Life</h2>
            <p>
                A cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </p>
        </div>
    )
}

export default About