import React from 'react';
import { useConnection } from '../state'

export const App = () => {
    const isQuizMaster = localStorage.getItem("master")
	console.log(`You're the master ${isQuizMaster}`)

    const { state, command } = useConnection(isQuizMaster)

    const handlePrevious = () => command('PREVIOUS')
    const handleNext = () => command('NEXT')

    return (
		<main>
			{ state && state.component() }
			{ isQuizMaster && state.id !== 0 && <button onClick={handlePrevious}>Previous</button> }
			{ isQuizMaster && state.id !== 3 && <button onClick={handleNext}>Next</button> }
		</main>
    );
}
