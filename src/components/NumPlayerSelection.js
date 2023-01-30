import React, { useContext } from 'react'
import { Context } from './Store.js'
import NameInput from './NameInput.js'
import './NumPlayerSelection.css'

export default function NumPlayerSelection(props) {

	const [state, dispatch] = useContext(Context);

	return (
		<form className='player-form'>
			<label htmlFor='num-player'>Select number of players:</label>
			<select
				name='num-player'
				id='num-player'
				defaultValue={state.numPlayerDefault}
				onChange={e => {
					dispatch({
						type: 'SELECT_NUM_PLAYER',
						payload: {
							numPlayerSelected: e.target.value,
						}
					});
				}}
			>
				<option value='2'>2</option>
				<option value='3'>3</option>
				<option value='4'>4</option>
			</select>
			<NameInput numInputs={state.numPlayerSelected} />
		</form>
	)
}
