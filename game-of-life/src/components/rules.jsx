import React from 'react';
 
function Rules () {
    return (
        <div className='rules'>
            <h1>Rules</h1>
            <ul>
                <li>Any live cell with fewer than two live neighbors dies, as if by under-population.</li>
                <br/>
                <li>Any live cell with two or three live neighbors lives on to the next generation.</li>
                <br/>
                <li>Any live cell with more than three live neighbors dies, as if by overpopulation.</li>
                <br/>
                <li>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</li>
            </ul>
        </div>
    )
}

export default Rules