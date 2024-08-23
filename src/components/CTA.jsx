import {useMediaQuery} from "react-responsive";


export default function CTA(props){

    const tablet = useMediaQuery({query: '(max-width:700px)'})

    switch (props.style){
        case "primary":
            return(
                <button 
                    className="btnPrimary" 
                    type={props.type}
                    disabled={props.disabled}
                >
                    {props.text}
                </button>
            );
            break;
        case "secondary":
            return(
                <button 
                    className={props.fullWidth ?  "fullWidth btnSecondary" : "btnSecondary" }
                    type={props.type}
                    disabled={props.disabled}
    
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                        
                    }}
                >   
                    {props.icon && <img src="src/assets/icon-preview-header.svg"/> }
                    {props.icon ? 
                        (tablet ?  null : props.text)
                        : 
                        props.text
                    }
                  
                   
                  
                </button>
            );
            break;
    }
}