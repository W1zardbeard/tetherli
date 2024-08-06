export default function CTA(props){
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
                    className="btnSecondary" 
                    type={props.type}
                    disabled={props.disabled}
                >
                    {props.text}
                </button>
            );
            break;
    }
}