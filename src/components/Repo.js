import React, { useContext } from 'react'
import {Context} from './Store.js'
import TileField from './TileField.js'
import './Repo.css'

export default function Repo(props) {

	const state = useContext(Context);

	return (
		<div id={'repo' + props.repo} className='repo-container'>
			{state[0].repos[props.repo].map(
				(el,i) => <TileField 
					key={i}
					tileColor={el} 
					repo={props.repo} 
					type='repo'/>
			)}
		</div>
	)
}
