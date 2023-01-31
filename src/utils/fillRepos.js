import getRandomInt from '../js_utils/getRandomInt.js'

export default function fillRepos(state) {

	let newState = { ...state };

	for (let i in newState.repos.slice(0,-1)) {// last repo is the middle and should not be filled
		let repoFilled = (nMissingInRepo(newState,i)===0);
		while (!repoFilled) {
			const randId = getRandomInt(
				0,
				newState.bag.length,
				nMissingInRepo(newState,i)
			);
			newState.repos[i] = newState.bag.filter((_,i) => randId.includes(i));
			newState.bag = newState.bag.filter((_,i) => !(randId.includes(i)));
			repoFilled = true;
			const bagHasEnoughTiles = (newState.bag.length >= newState.tilesPerRepo);
			if (!bagHasEnoughTiles) {
				newState = refillBag(newState);
				const bagHasEnoughTilesNow = (newState.bag.length >= newState.tilesPerRepo);
				if (!bagHasEnoughTilesNow) {
					throw new Error('There are too few tiles in the game!');
				}
			}
		}
	}

	return newState
}

function refillBag(state) {
	const newState = { ...state };

	newState.bag = newState.usedTiles;
	newState.usedTiles = [];

	return newState
}

function nMissingInRepo(state,i) {
	const nActual = state.repos[i].filter(el => el !== state.emptyTileField).length;
	const nTarget = state.tilesPerRepo;
	return nTarget-nActual
}
