import selectTiles from './selectTiles.js'
import putTilesIntoRow from './putTilesIntoRow.js'
import startNewGame from './startNewGame.js'
import setName from './setName.js'
import selectNumPlayer from './selectNumPlayer.js'

const reducer = (state, action) => {
	switch (action.type) {
		case 'SELECT_TILES':
			return selectTiles(state, action.payload);
		case 'PUT_TILES_INTO_ROW':
			return putTilesIntoRow(state, action.payload);
		case 'START_NEW_GAME':
			return startNewGame(state);
		case 'SELECT_NUM_PLAYER':
			return selectNumPlayer(state, action.payload);
		case 'SET_NAME':
			return setName(state, action.payload);
		default:
			return state;
	}
};

export default reducer;