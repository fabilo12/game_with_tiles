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

export default function gameState(
	playerList
) {
	//game hyperparameters
	this.nColor = N_COLORS;
	this.tileColorNames = TILE_COLOR_NAMES;
	this.tilesPerRepo = TILES_PER_REPO;
	this.tilesPerColor = TILES_PER_COLOR;
	this.emptyTileField = EMPTY_TILE_FIELD;
	this.nameListDefault = [...NAME_LIST_DEFAULT];
	this.numPlayerDefault = NUM_PLAYER_DEFAULT;

	//state shared between players
	this.nameListInput = (typeof(playerList) === 'undefined') ? 
		this.nameListDefault.slice(0, this.numPlayerDefault) : 
		[...playerList];
	this.playerList = (typeof(playerList) === 'undefined') ? 
		this.nameListDefault.slice(0, this.numPlayerDefault) : 
		[...playerList];
	this.numPlayerSelected = this.playerList.length;
	this.nPlayer = this.playerList.length;
	this.nRepos = 2 * this.nPlayer + 1;
	this.isGameOver = false;
	this.bag = Array.from(
		Array(N_COLORS), (_, i) => Array(TILES_PER_COLOR).fill(i)
	).flat();
	this.usedTiles = [];
	this.repos = Array(this.nRepos).fill().map(
		_ => Array(TILES_PER_REPO).fill(EMPTY_TILE_FIELD)
	);
	this.repos[this.nRepos] = [];//last repo is 'the middle', initially empty;
	this.startingTile = 'middle';
	this.playerAtTurn = getRandomInt(0, this.nPlayer)[0];
	this.playMode = "predefined";
	this.wallPattern = Array.from(
		Array(N_COLORS),
		(_, j) => Array.from(
			Array(N_COLORS),
			(_, i) => (N_COLORS - i + j) % N_COLORS
		)
	);

	//player specific state
	this.scores = Array(this.nPlayer).fill(0);
	this.rows = Array(this.nPlayer).fill().map(
		_ => Array.from(
			Array(N_COLORS), (_, i) => Array(i + 1).fill(EMPTY_TILE_FIELD)
		)
	);
	this.wall = Array(this.nPlayer).fill().map(
		_ => Array.from(
			Array(N_COLORS), _ => Array(N_COLORS).fill(EMPTY_TILE_FIELD)
		)
	);
	this.penalties = Array(this.nPlayer).fill().map(_ => []);

	//fill repos separately to facilitate reuse of fillRepos
	const filledRepoState = fillRepos(this);
	this.repos = filledRepoState.repos;
	this.bag = filledRepoState.bag;
	this.usedTiles = filledRepoState.usedTiles;
};
