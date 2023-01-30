export default function setName(state, payload) {

	const newState = { ...state };

	newState.nameListInput[payload.player] = payload.playerName;

	return newState
}
