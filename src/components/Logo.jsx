export default function Logo(props){
    const logoWidth ={
        width: props.width + "px"
    }
    return(
        
        <img 
            style={logoWidth}
            className="logo" 
            src={props.large ? "src/assets/logo-devlinks-large.svg" : "src/assets/logo-devlinks-small.svg"}
        />
    )
}