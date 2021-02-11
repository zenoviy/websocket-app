export const serverRequest = props => {
    console.log(props)
    return fetch(props.url, {
        method: props.method ? props.method : 'GET',
        headers: props.headers ? props.headers : false,
        body: props.body ? props.body : false
    })
}