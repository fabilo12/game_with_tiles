import React, { createContext, useReducer } from 'react';
import reducer from '../reducer/reducer.js'
import startNewGame from '../reducer/startNewGame.js'

const initialState = startNewGame();

const Store = ({ children }) => {

	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Context.Provider value={[state, dispatch]}>
			{children}
		</Context.Provider>
	)
};

export const Context = createContext(initialState);
export default Store;