import sumArray from '../js_utils/sumArray.js'

export default function calcPenalty(state, player) {
	
	const hasStartingTile = (state.startingTile === ('player' + player.toString())) ? 1 : 0;
	const nTiles = state.penalties[player].length + hasStartingTile;
	const penalty = sumArray(
		Array(nTiles).fill(0).map(
			(x, i) => Math.min(3, Math.ceil((i + 2) / 3))//[1,1,2,2,2,3,3,3,3,3,...]
		)
	)

	return penalty
}
