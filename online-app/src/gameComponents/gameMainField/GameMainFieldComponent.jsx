import React, { useRef, useEffect } from 'react'


const GameMainFieldComponent = props => {
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        console.log(context)
    }, [])
    

    
    return(
        <React.Fragment>
            <h1>Game</h1>
            <canvas ref={canvasRef}></canvas>
        </React.Fragment>
    )
}

export default GameMainFieldComponent