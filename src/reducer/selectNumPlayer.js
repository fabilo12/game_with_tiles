export default function selectNumPlayer(state, payload) {

	const newState = { ...state };

	newState.numPlayerSelected = payload.numPlayerSelected;

	for (let p = 0; p < payload.numPlayerSelected; p++) {
		if (typeof (newState.nameListInput[p]) === 'undefined') {
			newState.nameListInput[p] = newState.nameListDefault[p];
		};
	}

	newState.nameListInput = newState.nameListInput.slice(0, payload.numPlayerSelected);

	return newState
}
