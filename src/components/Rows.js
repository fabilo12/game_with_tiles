import React, { useContext } from 'react'
import { Context } from './Store.js'
import TileField from './TileField.js'
import './Rows.css'

export default function Rows(props) {

	const [state] = useContext(Context);

	return (
		<div className='rows-container'>
			{state.rows[props.player].map(
				(tileRow, rowId) => tileRow.map(
					(color, columnId) => 
						<TileField
							key={rowId.toString() + columnId.toString()}
							player = {props.player}
							type='row'
							row={rowId}
							column={(state.nColor - 1) - columnId}
							tileColor={color}
						/>
				)
			)}
		</div>
	)
}
