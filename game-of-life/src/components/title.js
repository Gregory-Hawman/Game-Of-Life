import React, { useState, useRef, useEffect } from 'react';
import '../css/index.css'
 
function Title (props) {
    const dropdownRef = useRef(null)

    const showAbout = () => {
        props.setMenuState({
            ...props.menuState,
            about: !props.menuState.about,
        })
    } 

    const showRules = () => {
        props.setMenuState({
            ...props.menuState,
            rules: !props.menuState.rules
        })
    }

    const showMenu = () => {
        props.setMenuOpen(!props.menuOpen);
    };

    useEffect(() => {
        const pageClickEvent = (e) => {
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                props.setMenuOpen(!props.menuOpen);
            }
        };

        if (props.menuOpen) {
            window.addEventListener('click', pageClickEvent)
        };
        
        return () => {
            window.removeEventListener('click', pageClickEvent)
        }
    }, [props.menuOpen])

    return (
        <div className='navbar-wrapper'>
            <div className='navbar'>
                <div></div>
                <div className='title'>
                    <h2>John Conway's</h2><h1> GAME OF LIFE</h1>
                </div>
                
                <div className='menu-container'> 
                    <div onClick={showMenu}className='menu-trigger' >
                        <span>Menu</span>
                    </div>

                    <nav ref={dropdownRef} className={`menu ${props.menuOpen ? 'active' : 'inactive'}`}>
                        <ul>
                            <li onClick={showAbout}>About</li>
                            <li onClick={showRules}>Rules</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Title