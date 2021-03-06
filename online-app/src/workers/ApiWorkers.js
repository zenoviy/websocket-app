export const serverRequest = props => {
    
    if(!props.headers) {
        //console.log(props, props.url)

        fetch(props.url, {method: 'GET'})
        .then(data => { 
            //console.log(data)
            return data.json()})
        .then(data => {
            console.log(data, 'retrival Data')
        })
        return fetch(props.url, {method: 'GET'}) 
    }
    return fetch(props.url, {
        method: props.method ? props.method : 'GET',
        headers: props.headers ? props.headers : false,
        body: props.body ? props.body : false
    })
}


export const locationLast = ({str}) => {
    let arrOfData = str.split('/');
    console.log(arrOfData.length)
    return arrOfData[arrOfData.length - 1]
}

export const serverWebSocketRequest = props => {
    
}