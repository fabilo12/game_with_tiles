import React, { useContext } from 'react'
import { Context } from './Store.js'
import './Info.css'

export default function Info() {

	const [state] = useContext(Context);

	let whoseTurn = 'It is ' + state.playerList[state.playerAtTurn].toString() + "'s turn:";
	let stateInfo = ''
	let whatToDo = '';
	if (state.isGameOver) {
		whoseTurn = 'The game is over.';
		const maxScore = Math.max(...state.scores);
	    const winner = state.playerList.filter(
    	    (_,i) => state.scores[i] === maxScore
    	);
		stateInfo = winner.join(' and ') + ' win(s) with ' + maxScore + ' points.';
		whatToDo = 'Please click below button to start a new game!';
	} else if (state.hasOwnProperty('selectedTiles')) {
		const auxRepo = state.selectedTiles.repo==='middle' ? 
			'the leftovers' : 
			'repository ' + state.selectedTiles.repo;
		stateInfo = 
			state.tileColorNames[state.selectedTiles.color] + 
			' tiles selected from ' +
			auxRepo + '.';
		whatToDo = 'Please select a target row!';
	} else {
		stateInfo = 'No tiles selected.';
		whatToDo = 'Please select tiles from repository or leftovers!';
	}
	
	return (
		<React.Fragment>
			<output className='info-output'>{whoseTurn}</output>
			<output className='info-output state-info'>{stateInfo}</output>
			<output className='info-output what-to-do'>{whatToDo}</output>
		</React.Fragment>
	)
}
