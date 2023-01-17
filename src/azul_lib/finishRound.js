import fillRepos from './fillRepos.js';
import calcPenalty from './calcPenalty.js'
import addArrays from '../js_utils/addArrays.js'

export default function finishRound(state) {
    /* this function is called in putTilesIntoRow.js if all repos are empty*/
	
    let newState = { ...state };

    newState = evaluateRows(newState);
    newState = evaluatePenalties(newState);
    const isGameOver = anyRowFull(newState);
    if (isGameOver) {
        newState = addFinalScore(newState);
        newState.isGameOver = true;
    } else {
        newState = fillRepos(newState);
        newState = putBackStartingTile(newState);
    }
    
    return newState
}

function evaluateRows(state) {
    /*
    for full rows, this function:
    1) moves one tile per row to wall
    2) updates scores based on added wall tiles
    3) empties rows
    */

	let newState = { ...state };

    for (let player = 0; player < newState.rows.length; player++) {
        for (let row = 0; row < newState.rows[player].length; row++) {
            const rowColor = newState.rows[player][row][0];
            const isRowFull = (
                newState.rows[player][row].every(
                    el => el===rowColor
                ) && 
                rowColor!==newState.emptyTileField
            );
            if (isRowFull) {
                const column = newState.wallPattern[row].findIndex(el => el===rowColor);
                newState.wall[player][row][column] = rowColor;
                const lastTile = [row, column];
                newState = addScoreForLastTile(newState, player, lastTile);
                newState = emptyRow(newState, player, row);
            }
        }
    }

	return newState
}

function addScoreForLastTile(state, player, lastTile) {

	const newState = { ...state };

    let scoreForLastTile = 1;

    const directions = [
        [
            [1,0],//vertical
            [-1,0]//vertical
        ],
        [
            [0,1],//horizontal
            [0,-1]//horizontal
        ]
    ];

    for (let d in directions) {//vertically or horizontally
        for (let delta of directions[d]) {//up or down / left or right
            let hasNeighbor = true;
            let positionOnWall = lastTile;
            while (hasNeighbor) {
                positionOnWall = addArrays(positionOnWall, delta);
                const row = positionOnWall[0];
                const column = positionOnWall[1];
                const isPosOnWall = 
                    (row > -1) &&  
                    (column > -1) && 
                    (row < state.nColor) && 
                    (column < state.nColor);
                if(isPosOnWall) {
                    const isPosEmpty = (newState.wall[player][row][column]===state.emptyTileField);
                    if (isPosEmpty) {
                        hasNeighbor = false;
                    } else {
                        scoreForLastTile++;
                    }  
                } else {
                    hasNeighbor = false;
                }
            }
        }
    }
    newState.scores[player] += scoreForLastTile;

	return newState
}

function emptyRow(state, player, row) {

	const newState = { ...state };

    const rowLength = row + 1;
    const rowColor = newState.rows[player][row][0];
    newState.usedTiles.push(
        ...Array(rowLength-1).fill(rowColor)//one tile is put on the wall
    );
	newState.rows[player][row] = Array(rowLength).fill(newState.emptyTileField);

	return newState
}

function evaluatePenalties(state) {
    /*
    this function:
    1) updates scores based on penalties
    2) moves penalty tiles to usedTiles
    */

	const newState = { ...state };

	for (let player in newState.penalties) {
        
        const penalty = calcPenalty(newState, player);
        newState.scores[player] -= penalty;
        newState.scores[player] = Math.max(//negative score is not allowed
            0,
            newState.scores[player]
        );

        newState.usedTiles.push(
            ...newState.penalties[player]
        );
        newState.penalties[player] = [];
    }

	return newState
}

function putBackStartingTile(state) {

	const newState = { ...state };

	newState.startingTile = 'middle';

	return newState
}

function anyRowFull(state) {
   
	let newState = { ...state };

    let isGameOver = false;
    for (let player in newState.wall) {
        for (let row in newState.wall[player]) {
            const isRowFull = newState.wall[player][row].every(
                el => el !== newState.emptyTileField
            );
            if (isRowFull) {
                isGameOver = true;
                return isGameOver            
            }
        }
    }

	return isGameOver
}

function addFinalScore(state) {

    const newState = { ...state };
    
    for (let player in newState.wall) {
        let cumScore = 0;
        for (let row in newState.wall[player]) {
            const isRowFull = newState.wall[player][row].every(
                el => el !== newState.emptyTileField
            );
            if (isRowFull) {
                cumScore += 2;
            }
        }
        for (let column in newState.wall[player]) {
            const columnSum = newState.wall[player].reduce(
                (acc,el) => acc + el[column],
                0
            );
            const isColumnFull = (columnSum === 10);
            if (isColumnFull) {
                cumScore += 7;
            }
        }
        for (let color in newState.wall[player]) {
            const isColorFull = newState.wall[player].every(
                el => el.includes(color)
            );
            if (isColorFull) {
                cumScore += 10;
            }
        }
        newState.scores[player] += cumScore;
    }

    return newState
}
