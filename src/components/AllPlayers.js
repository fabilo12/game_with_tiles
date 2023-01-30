import React, {useContext} from 'react';
import {Context} from './Store.js'
import Player from './Player.js';

export default function AllPlayers() {
	/*this auxiliaury component is necesary to avoid use of state in App.js*/

	const state = useContext(Context);

	return (
		<React.Fragment >
			{state[0].playerList.map((el, i) => <Player key={i} player={i} />)}
		</React.Fragment>
	)
}
