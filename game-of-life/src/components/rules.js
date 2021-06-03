import React from 'react';
 
function Rules (props) {
    

    return (
        <div className={`rules ${props.menuState.rules ? 'active' : 'inactive'}`}>
            <h2>Rules</h2>
            <p>Any live cell with fewer than two live neighbors dies, as if by under-population.</p>
            <br/>
            <p>Any live cell with two or three live neighbors lives on to the next generation.</p>
            <br/>
            <p>Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
            <br/>
            <p>Any dead cell with exactly three live neighbors becomes a live cell, as if by repopulation.</p>
        </div>
    )
}

export default Rules;