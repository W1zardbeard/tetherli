export default function TitleDesc(props){
    return(
        <div className="titleAndDesc">
                <h1>{props.title}</h1>
                <p>{props.subText}</p>
        </div>
    )
}