import {useContext} from 'react';
import { Context } from './Store.js'

export default function WinnerAlert() {

	const [state] = useContext(Context);
    if (state.isGameOver) {
        alert('Game is over! Click button on the right to start new game!')
    }

    return
}
