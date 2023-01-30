import React from 'react';
import Store from './Store.js'
import SideBar from './SideBar.js'
import AllPlayers from './AllPlayers.js'
import Center from './Center.js'
import WinnerAlert from './WinnerAlert.js';
import './App.css';

export default function App() {

	return (
		<Store >
			<div id='app-container'>
				<SideBar />
				<AllPlayers />
				<Center />
				<WinnerAlert />
			</div>
		</Store>
	);
}
