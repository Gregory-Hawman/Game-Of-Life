import React from 'react';
import '../../css/index.css'
 
function Rules () {
    return (
        <div className='rules-v1'>
            <h2>Rules</h2>
            <p>Any live cell with fewer than two live neighbors dies, as if by under-population.</p>
            <br/>
            <p>Any live cell with two or three live neighbors lives on to the next generation.</p>
            <br/>
            <p>Any live cell with more than three live neighbors dies, as if by overpopulation.</p>
            <br/>
            <p>Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.</p>
        </div>
    )
}

export default Rules