import React, { useContext } from 'react'
import { Context } from './Store.js'
import './StartButton.css'

export default function StartButton(props) {

	const [state, dispatch] = useContext(Context);

	return (
		<button
			id='start-button'
			onClick={() => dispatch(
				{ type: 'START_NEW_GAME' }
			)}
		>Start new game </button>
	)
}