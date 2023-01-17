export default function selectTiles(state, payload) {

	const newState = { ...state };

	newState.selectedTiles = {};
	newState.selectedTiles.repo = payload.repo;
	newState.selectedTiles.color = payload.color;

	return newState
}
