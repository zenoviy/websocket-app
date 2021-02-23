import React from 'react'
import { convrtFormToObjects } from '../../workers/formWorker'

const GameOptionsComponent = ({context, gameEngine, canvasRef}) => {
    const startFunction = (e) => {
        e.preventDefault()
        const settingsformResult = convrtFormToObjects({ form: e.target });
        context.setGameEngine({engine: gameEngine({canvasRef})})
    }
    return (
        <React.Fragment>
            <div className='user-form-wrapper'>
                <div className='game-notification'>
                   <h3>Chose color of unit</h3>
                   <form onSubmit={(e) => { startFunction(e) }}>
                        <input name='unitColor' type='color' required />
                        <button type='submit'>Start</button> 
                   </form>
                </div>
            </div>
        </React.Fragment>
    )
}
export default GameOptionsComponent