import React, {useContext} from 'react';
import { Context } from './Store.js'
import PlayerHeader from './PlayerHeader.js'
import Rows from './Rows.js'
import Wall from './Wall.js'
import Penalties from './Penalties.js'
import './Player.css'

export default function Player(props) {

	const [state] = useContext(Context);
	const atTurn = state.playerAtTurn=== props.player ? 'at-turn' : '';

	return (
		<div
			id={'player' + props.player}
			className={'player-container ' + atTurn}
		>
			<PlayerHeader player={props.player} />
			<Rows player={props.player}/>
			<Wall player={props.player}/>
			<Penalties player={props.player}/>
		</div>
	)
}
