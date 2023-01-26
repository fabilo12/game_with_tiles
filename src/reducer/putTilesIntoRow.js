import finishRound from '../utils/finishRound.js'

export default function putTilesIntoRow(state, payload) {

	let newState = { ...state };

	const isValidRow = checkRowValidity(state, payload);

	if (isValidRow) {
		newState = processDrawnTiles(newState, payload);
		newState = putRestToMiddle(newState);
		newState = emptyRepo(newState);
		newState = takeStartingTile(newState);
		newState = deleteSelectedTiles(newState);
		newState = goToNextPlayer(newState);
		const isRoundOver = newState.repos.every(
			el => el.every(el => el===newState.emptyTileField)
		);
		if (isRoundOver) {
			newState = finishRound(newState);
		}
	} else {
		alert('Choose another row, please! Only empty rows or rows with tiles of the same color as the selected tile color are possible. Furthermore, rows that were already filled with the selected color are forbidden. If no row is possible, please click on a penalty button!')
	}

	return newState
}

function checkRowValidity(state, payload) {
	
	if (!payload.hasOwnProperty('row')) {
		return true
	}
	const rowIsEmpty = (
		state.rows[state.playerAtTurn][payload.row][0] === state.emptyTileField
	);
	const rowHasSameColor = (
		state.rows[state.playerAtTurn][payload.row][0] === state.selectedTiles.color
	);
	const wallRowContainsColor = (
		state.wall[state.playerAtTurn][payload.row].includes(state.selectedTiles.color)
	);

	return (rowIsEmpty || rowHasSameColor) && !wallRowContainsColor
}

function processDrawnTiles(state, payload) {

	const newState = { ...state };

	const drawn = newState.repos[newState.selectedTiles.repo].filter(
		el => el === newState.selectedTiles.color
	);
	let excessiveTiles;
	if (payload.hasOwnProperty('row')) {
		let filledRow = 
			newState.rows[newState.playerAtTurn][payload.row].filter(
				el => el !== newState.emptyTileField
			).concat(drawn);
		const rowLength = payload.row + 1;
		excessiveTiles = filledRow.slice(rowLength);
		newState.rows[newState.playerAtTurn][payload.row] = Array.from(
			Array(rowLength), 
			(_, i) => i < filledRow.length ? filledRow[i]: -1
		);
	} else {
		excessiveTiles = [...drawn];
	}
	newState.penalties[newState.playerAtTurn].push(...excessiveTiles);

	return newState
}

function putRestToMiddle(state) {

	const newState = { ...state };

	if (newState.selectedTiles.repo !== newState.nRepos) {
		const rest = newState.repos[newState.selectedTiles.repo].filter(
			el => el!==newState.selectedTiles.color
		)
		newState.repos[newState.nRepos] = newState.repos.at(-1).concat(rest);
	}

	return newState
}

function emptyRepo(state) {
	
	const newState = { ...state };

	if (newState.selectedTiles.repo === newState.nRepos) {//tiles taken from middle
		newState.repos[newState.selectedTiles.repo] = 
			newState.repos[newState.selectedTiles.repo].filter(
				el => el!==newState.selectedTiles.color
			);
	} else {
		newState.repos[newState.selectedTiles.repo] = 
		Array(newState.tilesPerRepo).fill(newState.emptyTileField);
	}
	
	return newState
}


function takeStartingTile(state) {

	const newState = { ...state };

	const startingTileInMiddle = (newState.startingTile === 'middle');
	const drawnFromMiddle = (newState.selectedTiles.repo === newState.nRepos);
	if (startingTileInMiddle && drawnFromMiddle) {
		newState.startingTile = 'player' + newState.playerAtTurn;
	}

	return newState
}

function deleteSelectedTiles(state) {

	const newState = { ...state };

	delete newState.selectedTiles;
	
	return newState
}

function goToNextPlayer(state) {

	const newState = { ...state };

	newState.playerAtTurn = (newState.playerAtTurn + 1) % newState.nPlayer;

	return newState
}
