import React, { useRef, useEffect, useContext, useState } from 'react'

import GameOptionsComponent from './GameOptions'
import ChatMainComponent from '../chatRoom/ChatMainComponent'
import * as Game from '../../workers/gameLogic'
import { Context } from '../../store/MainAppStore'
import { convrtFormToObjects } from '../../workers/formWorker'
import './gameStyle.css'


/*
    Game room must check user befor room load
*/
const GameMainFieldComponent = props => {

    const canvasRef = useRef(null);
    const canvasWrapper = useRef(null);
    const context = useContext(Context);
    let ctx = null;
    const gameLocalData = {
        character: {
            radius: 20,
            x: 100,
            y: 100,
            color: '#ff000034',
            speed: 5
        }
    }
    let width = null; let height = null;

    useEffect(() => {
        return () => {
            Game.removeGameController()
            context.stopGameEngine()
        } 
    }, [])
    

    const gameContext = ({canvasRef}) => {
        let canvas = canvasRef.current;
        let ctx = canvas.getContext('2d');
        return {
            canvas,
            ctx
        } 
    }
    const gameEngine = ({canvasRef}) => {
        Game.gameController({gameLocalData})

        let contexts = gameContext({canvasRef})
        let ctx = contexts.canvas ? contexts.canvas.getContext('2d') : null;
        let canvasSize = Game.findCtxSize({target: canvasWrapper, defaultHeight: 600});
        width = canvasSize.width;
        height = canvasSize.height;
        return setInterval(() => {
            Game.clearContext({ctx, width, height})
            Game.createCircle({
                ctx, 
                x: gameLocalData.character.x,
                y: gameLocalData.character.y,
                radius: gameLocalData.character.radius,
                color: gameLocalData.character.color
            })
            
        }, 20)
    }
    
    if( context.gameData.gameReady ) {
        let contexts = gameContext({canvasRef})
        ctx = contexts.ctx ? contexts.ctx : null;
        //context.setCanvasCtx({ctx})
        let canvasSize = Game.findCtxSize({target: canvasWrapper, defaultHeight: 600});
        width = canvasSize.width;
        height = canvasSize.height;
        Game.createGameField({canvas: contexts.canvas, ctx, width, height})
        
    }
    
    return(
        <React.Fragment >
            { !context.gameData.gameReady ? <GameOptionsComponent 
                context={context} 
                gameEngine={gameEngine}
                gameLocalData={gameLocalData}
                canvasRef={canvasRef}
                 /> : null }
            <div className='game-main-wrapper'>
                <div className='game-wrapper-area'>
                    <div className='game-inner-wrapper' ref={canvasWrapper}>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                    <ChatMainComponent />                   
                </div>
            </div>
        </React.Fragment>
    )
}

export default GameMainFieldComponent