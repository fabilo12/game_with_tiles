import React, { useContext } from 'react';
import { Context } from './Store.js'
import './TileField.css';


export default function TileField(props) {
	//TileField is used in Rows.js, Repo.js and Wall.js

	const [state, dispatch] = useContext(Context);

	const row = typeof (props.row) === 'undefined' ? '' : 'row' + props.row;
	const column = typeof (props.column) === 'undefined' ? '' : 'column' + props.column;
	const occupancy = (props.tileColor === state.emptyTileField) ?
		'empty' :
		'occupied tile-color-' + props.tileColor;
	const pattern = (props.type === 'wall') ?
		'pattern-color-' + state.wallPattern[props.row][props.column] :
		'';

	let callBack = { type: '' };//default reducer is identity function
	if (props.type === 'repo' && occupancy !== 'empty') {
		callBack = {
			type: 'SELECT_TILES',
			payload: {
				color: props.tileColor,
				repo: props.repo,
			}
		};
	} else if (props.type === 'row' && state.hasOwnProperty('selectedTiles')) {
		if (props.player === state.playerAtTurn) {
			callBack = {
				type: 'PUT_TILES_INTO_ROW',
				payload: {
					row: props.row,
				}
			};
		}
	}

	return (
		<button
			className={['tile-field', row, column, occupancy, pattern].join(' ')}
			onClick={() => dispatch(callBack)}
		></button>
	)
}
