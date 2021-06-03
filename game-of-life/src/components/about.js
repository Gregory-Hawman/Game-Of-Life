import React from 'react';
 
function About (props) {

    return (
        <div className={`about ${props.menuState.about ? 'active' : 'inactive'}`}>
            <h2>Game of Life</h2>
            <p>
                A cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.
            </p>
        </div>
    )
}

export default About