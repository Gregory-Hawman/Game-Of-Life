import React from 'react';
 
function About () {
    return (
        <div className='about'>
            <h1><a>Conway's Game of Life</a></h1>
            <p>
                A cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </p>
        </div>
    )
}

export default About