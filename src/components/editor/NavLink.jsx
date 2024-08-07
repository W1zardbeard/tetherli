export default function NavLink(props){
   
    

    return(
        props.active ? 
        <a 
        href={props.linkTo}
        onClick={() => {
            props.onClick(props.linkTo);
        }}>
            <div className="navLink activeLink">
                <img 
                    src={props.imgSrc} 
                />
                <h2>{props.text}</h2>
            </div>
        </a>
        : 
        <a  
        href={props.linkTo}
        onClick={() => {
            props.onClick(props.linkTo);
        }}>
            <div className="navLink">
                <img 
                    src={props.imgSrc} 
                />
                <h2>{props.text}</h2>
            </div>
        </a>
    )
}