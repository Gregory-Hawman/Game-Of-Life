import React, { useState, useRef, useEffect } from 'react';
import '../../css/index.css'
 
function Navbar (props) {
    const dropdownRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)

    const [menuState, setMenuState] = useState({
        about: false,
        rules: false
    })

    const onClickAbout = () => {
        setMenuState({
            ...menuState,
            about: !menuState.about,
        })
    } 

    const onClickRules = () => {
        setMenuState({
            ...menuState,
            rules: !menuState.rules
        })
    }

    const showMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setMenuOpen(!menuOpen);
            }
        };

        if (menuOpen) {
            window.addEventListener('click', pageClickEvent)
        };
        
        return () => {
            window.removeEventListener('click', pageClickEvent)
        }
    }, [menuOpen])

    return (
        <div className='navbar'>
            <div></div>
            <h1>Conway's Game of Life</h1>
            <div className='menu-container'> 
                <div onClick={showMenu}className='menu-trigger' >
                    <span>Menu</span>
                </div>

                <nav ref={dropdownRef} className={`menu ${menuOpen ? 'active' : 'inactive'}`}>
                    <ul>
                        <li onClick={onClickAbout}>About</li>
                        <li onClick={onClickRules}>Rules</li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar