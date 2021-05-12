import React from 'react';
import '../../css/index.css';
 
function Buttons () {
    return (
        <div className='button-section'>
            <div className='button-section-row-1'>
                <div className='d-pad-section'>
                    <div className='d-pad ud'><h2 className='up'></h2></div>
                    <div className='lr-row'>
                        <div className='d-pad lr'>
                            <h2></h2>
                        </div>
                        <div className='d-pad lr'>
                            <h2></h2>
                        </div> 
                        <div className='d-pad lr'>
                            <h2></h2>
                        </div>    
                    </div>
                    <div className='d-pad ud'><h2></h2></div>
                </div>

                <div>
                    <div className='row xy-text-row'>
                        <h2 className='gb-text'>Y</h2>  
                        <h2 className='gb-text'>X</h2>
                    </div>
                    <div className='row'>
                        <div className='xy abxy-btn'></div>
                        <div className='xy abxy-btn'></div>
                    </div>
                    
                    <div className='row ab-btn-row'>
                        <div className='ab abxy-btn'></div>
                        <div className='ab abxy-btn'></div>
                    </div>
                    <div className='row ab-text-row'>
                        <h2 className='gb-text'>B</h2>
                        <h2 className='gb-text'>A</h2>
                    </div>
                </div>
            </div>
            

            <div className='button-section-row-2'>
                <div className='select'>
                    <div className='ss'></div>
                    <h2 className='gb-text ss-text'>SELECT</h2>
                </div>
                <div className='start'>
                    <div className='ss'></div>
                    <h2 className='gb-text ss-text'>START</h2>
                </div>
            </div>
        </div>
    )
}

export default Buttons