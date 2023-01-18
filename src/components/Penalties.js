import React, { useContext } from 'react'
import { Context } from './Store.js'
import DistViz from './DistViz.js';
import calcPenalty from '../utils/calcPenalty.js'
import './Penalties.css'


export default function Penalties(props) {

	const [state] = useContext(Context);

	const penaltyDist = state.penalties[props.player];
	const penalty = calcPenalty(state, props.player);

	return (
		<div className='penalties'>
			<DistViz place={'player' + props.player} dist={penaltyDist} />
			<div className='penalty-value'>{penalty}</div>
		</div>
	)
}
