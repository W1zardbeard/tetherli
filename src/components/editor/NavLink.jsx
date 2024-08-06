export default function NavLink(props){
   
    return(
        props.active ? 
        <div className="navLink activeLink">
            <img 
                src={props.imgSrc} 
            />
            <h2>{props.text}</h2>
        </div>
        : 
        <div className="navLink">
            <img 
                src={props.imgSrc} 
            />
            <h2>{props.text}</h2>
        </div>
    )
}