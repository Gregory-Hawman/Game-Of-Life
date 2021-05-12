import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/index.css';
 
const OnScreenButtons = () => {
    const [inGame, setInGame] = useState(false);
    
    const enterGame = e => {
        setInGame(inGame ? true : !inGame);
    }

    const exitGame = e => {
        setInGame(inGame ? !inGame : false);
    }

    return (
        <div className='OSBGroup'>
            <Link to='/game'>
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={enterGame} 
                >
                        Start
                </button>
            </Link>

            {inGame ?
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={enterGame}
                >
                    Step
                </button>
                : null}

            <Link to={inGame ? '/controls' : '/about'}>
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={inGame ? enterGame : exitGame} 
                >
                    {inGame ? 'Controls' : 'About'}
                </button>
            </Link>

            {inGame ? null : <Link to='/rules'>
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={exitGame} 
                >
                    Rules
                </button>
            </Link>}

           {inGame ? <Link to='/'>
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={exitGame}
                >
                    Back
                </button>
            </Link> : null}

            {inGame ? 
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={enterGame}
                >
                    Clear
                </button>
                : null
            }

            {inGame ? 
                <button 
                    className='OnScreenButtons OSB' 
                    onClick={enterGame}
                >
                    Random
                </button>
                : null
            }
        </div>
    )
}
    
export default OnScreenButtons