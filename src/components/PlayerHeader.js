import React, { useContext } from 'react'
import { Context } from './Store.js'
import './PlayerHeader.css'

export default function PlayerHeader(props) {

	const [state] = useContext(Context);

	return (
		<div className='player-header'>
			<div className='player-name'>
				{state.playerList[props.player]}
			</div>
			<div className='player-score'>
				{state.scores[props.player]}
			</div>
		</div>
	)
}
