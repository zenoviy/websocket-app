export const createGameField = ({canvas, ctx, width, height}) => {
    canvas.width = width;
    canvas.height = height;
    ctx.width = width;
    ctx.height = height;
}
export const findCtxSize = ({target, defaultHeight}) => {
    let width = target.current.clientWidth;
    let height = defaultHeight ? defaultHeight : target.clientHeight;
    return {
        width,
        height
    }
}


export const clearContext = ({ctx, width, height}) => {
    ctx.clearRect(0, 0, width, height);
}

export const createImage = props => {

}
export const createRectangle = props => {
    
}

export const createCircle = ({ctx, x, y, radius, color, stroke}) => {
    /*if(color) ctx.fillStyle = color; 
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    if(stroke) {
        ctx.stroke()
    } 
    ctx.closePath();
    if(color) ctx.fill()*/
    if(color) ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.fill()
}