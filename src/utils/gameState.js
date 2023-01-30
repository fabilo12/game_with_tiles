import getRandomInt from '../js_utils/getRandomInt.js';
import fillRepos from './fillRepos.js'

//global settings
const N_COLORS = 5;
const TILE_COLOR_NAMES = ['Blue', 'Yellow', 'Red', 'Black', 'Turquoise'];
const TILES_PER_REPO = 4;
const TILES_PER_COLOR = 20;
const EMPTY_TILE_FIELD = -1;
const NAME_LIST_DEFAULT = ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
const NUM_PLAYER_DEFAULT = 4;

export default function gameState(playerListArg) {

	const playerListAux = (typeof (playerListArg) === 'undefined') ?
		[...NAME_LIST_DEFAULT].slice(0, NUM_PLAYER_DEFAULT) :
		[...playerListArg];
	const nPlayerAux = playerListAux.length;
	const nReposAux = 2 * nPlayerAux + 1;

	const initState = {
		//game hyperparameters
		nColor: N_COLORS,
		tileColorNames: TILE_COLOR_NAMES,
		tilesPerRepo: TILES_PER_REPO,
		tilesPerColor: TILES_PER_COLOR,
		emptyTileField: EMPTY_TILE_FIELD,
		nameListDefault: [...NAME_LIST_DEFAULT],
		numPlayerDefault: NUM_PLAYER_DEFAULT,

		//state shared between players
		nameListInput: (typeof (playerListArg) === 'undefined') ?
			[...NAME_LIST_DEFAULT].slice(0, NUM_PLAYER_DEFAULT) :
			[...playerListArg],
		playerList: playerListAux,
		numPlayerSelected: nPlayerAux,
		nPlayer: nPlayerAux,
		nRepos: nReposAux,
		isGameOver: false,
		bag: Array.from(
			Array(N_COLORS), (_, i) => Array(TILES_PER_COLOR).fill(i)
		).flat(),
		usedTiles: [],
		repos: Array(nReposAux + 1).fill().map(
			(_, i) => i < (nReposAux) ?
				Array(TILES_PER_REPO).fill(EMPTY_TILE_FIELD) :
				Array(0)
		),//last repo is 'the middle', initially empty,
		startingTile: 'middle',
		playerAtTurn: getRandomInt(0, nPlayerAux)[0],
		wallPattern: Array.from(
			Array(N_COLORS),
			(_, j) => Array.from(
				Array(N_COLORS),
				(_, i) => (N_COLORS - i + j) % N_COLORS
			)
		),

		//player specific state
		scores: Array(nPlayerAux).fill(0),
		rows: Array(nPlayerAux).fill().map(
			_ => Array.from(
				Array(N_COLORS), (_, i) => Array(i + 1).fill(EMPTY_TILE_FIELD)
			)
		),
		wall: Array(nPlayerAux).fill().map(
			_ => Array.from(
				Array(N_COLORS), _ => Array(N_COLORS).fill(EMPTY_TILE_FIELD)
			)
		),
		penalties: Array(nPlayerAux).fill().map(_ => [])
	};

	console.log(initState.repos.concat([]))
	const initStateFilledRepo = fillRepos(initState);

	return initStateFilledRepo
};
