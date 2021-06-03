import React, { useState } from 'react';
import Title from './components/title';
import Game from './components/game';
import About from './components/about';
import Rules from './components/rules';
import './css/App.css'

function App () {
	const [menuOpen, setMenuOpen] = useState(false)
    const [menuState, setMenuState] = useState({
        about: false,
        rules: false
    })

	return (
		<div >
			<Title 
				menuOpen={menuOpen}
				setMenuOpen={setMenuOpen}
				menuState={menuState}
				setMenuState={setMenuState}
			/>

			<div className='app-container'>
				<div className={`game-board ${menuState.about || menuState.rules ? 'shared' : 'solo'}`}>
					<Game />
				</div>
				<div className='menu-items'>
					<About 
					menuState={menuState}
					/>

					<Rules 
					menuState={menuState}
					/>

				</div>
			</div>
		</div>
	);
  }

export default App;