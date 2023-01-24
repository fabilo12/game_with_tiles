import React, { useContext } from 'react'
import { Context } from './Store.js'
import './DistViz.css'

export default function DistViz(props) {
//DistViz is used in Center.js and Penalties.js

	const [state, dispatch] = useContext(Context);

	const size = (props.place === 'middle') ? 'larger-size' : 'normal-size';

	const dist = tileColToDist(props.dist, state.nColor);

	return (
		<div className='dist-viz-container'>
			{dist.map(
				(el, i) => {
					return (
						<button
						    key={i} 
							className={['dist-viz-tile', 'tile-color-' + i, size].join(' ')} 
							onClick={() => dispatch(
								getCallBack(state, i, props.place)
							)}
						>{el}</button>
					)
				}
			)}
			{state.startingTile === props.place
				? <button
					id='starting-tile'
					className={['dist-viz-tile', size].join(' ')}
				>{1}</button>
				: null
			}
		</div >
	)
}

function getCallBack(state, color, place) {
	let callBack = {type: ''};//default reducer is identity function
	const existColor = (state.repos.at(-1).findIndex(el => el===color) > -1)
	if ((place === 'middle') && existColor) {
		callBack = {
		  type: 'SELECT_TILES',
		  payload: {
			color: color,
			repo: state.nRepos,
		  }
		};
	} else if (place.slice(0,6)==='player' && state.hasOwnProperty('selectedTiles')) {
		callBack = {
			type: 'PUT_TILES_INTO_ROW',
			payload: {},
		};
	}
	return callBack
}

function tileColToDist(tileCol, nColor) {
	return (
		[...Array(nColor).keys()].map(
			i => tileCol.filter(el => (el === i)).length
		)
	);
}
