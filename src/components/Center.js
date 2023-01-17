import React, {useContext} from 'react';
import {Context} from './Store.js'
import Repo from './Repo.js'
import DistViz from './DistViz.js';
import './Center.css'

export default function Center() {

	const state = useContext(Context);

	const middleDist = state[0].repos.at(-1);

	return (
		<div id='center-container'>
			<div id='all-repos-container'>
				{state[0].repos.slice(0,-1).map((el, i) => <Repo key={i} repo={i} />)}
			</div>
			<div id='middle-tiles-container'>
				<DistViz place='middle' repo={state[0].nRepos} dist={middleDist}/>
			</div>
		</div>
	)
}
