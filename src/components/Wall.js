import React, { useContext } from 'react';
import { Context } from './Store.js'
import TileField from './TileField.js'
import './Wall.css'

export default function Wall(props) {

	const state = useContext(Context);

	return (
		<div className='wall-container'>
			{state[0].wall[props.player].map(
				(tileRow,rowId) => tileRow.map(
					(color,columnId) => 
					<TileField
					key={rowId.toString() + columnId.toString()}
					type='wall' 
					row={rowId} 
					column={columnId}
					tileColor={color} 
					/>
				)
			)}
		</div>
	)
}
