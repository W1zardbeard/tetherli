export default function NavLink(props){
   
    return(
        props.active ? 
        <div className="navLink">
            <img 
                src="src/assets/icon-link.svg" 
            />
            <h2>{props.text}</h2>
        </div>
        : 
        null 
    )
}