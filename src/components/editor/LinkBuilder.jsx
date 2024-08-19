export default function LinkBuilder(props){
    return(
        <div className="linkBuilder">
            <h1>{props.type}</h1>
            <h2>{props.url}</h2>
        </div>
    )
}