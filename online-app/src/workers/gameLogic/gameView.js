export const createGameField = props => {
    props.ctx.width = props.width;
    props.ctx.height = props.height;
}


export const clearContext = props => {
    const ctx = props.ctx;
    ctx.clearContext(props.width, props.height);
}

export const createImage = props => {

}
export const createRectangle = props => {
    
}