import React, { useContext } from 'react'
import { Context } from './Store.js'
import './NameInput.css'

export default function NameInput(props) {

	const [state, dispatch] = useContext(Context);

    return (
        [...Array(Number(props.numInputs)).keys()].map(
            el => (
                <React.Fragment key={el}>
                    <label 
                        htmlFor={'name' + el}
                    >Name of {state.nameListDefault[el]}:</label>
                    <input 
                        type='text' 
                        id={'input-name' + el} 
                        className='name-input'
                        defaultValue={state.nameListDefault[el]}
                        name={'name' + el}
                        onChange={
                            e => dispatch({
                                type: 'SET_NAME',
                                payload: {
                                    player: el,
                                    playerName: e.target.value,
                                }
                            })
                        }
                    />
                </React.Fragment>
            )
        )
    )
}