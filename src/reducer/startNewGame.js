import gameState from '../utils/gameState.js'

export default function startNewGame(state) {

	let playerList;
	const isInitialCall = (typeof (state) === 'undefined');
	if (!isInitialCall) {
		playerList = state.nameListInput;
	}
	const initialState = gameState(playerList);

	return initialState
}