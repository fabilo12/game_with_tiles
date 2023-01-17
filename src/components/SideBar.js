import React from 'react'
import Info from './Info.js'
import StartButton from './StartButton.js'
import NumPlayerSelection from './NumPlayerSelection.js'
import './SideBar.css'

export default function SideBar() {

	return (
		<div id='sidebar-container'>
			<Info />
			<StartButton />
			<NumPlayerSelection />
		</div>
	)
}
