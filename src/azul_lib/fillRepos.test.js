import fillRepos from './fillRepos.js'
import gameState from '../azul_lib/gameState.js'

test('fills repos with valid integers', () => {
	//set up
	const TILES_PER_REPO = 4;
	const N_COLORS = 5;
	const TILES_PER_COLOR = 20;
	const EMPTY_TILE_FIELD = -1;
	const PLAYER_LIST = ['player1', 'player2', 'player3', 'player4'];
	const initialState = new gameState(
		N_COLORS,
		TILES_PER_REPO,
		TILES_PER_COLOR,
		EMPTY_TILE_FIELD,
		PLAYER_LIST
	)

	//apply dut
	const newState = fillRepos(state);
	const colorIds = newState.repos.map(el => {
		el > -1 && el<newState.nC
	});
	allInRange = Array(newState.repos.length).fill(true);

	//test
	expect().toBe(allInRange);
});