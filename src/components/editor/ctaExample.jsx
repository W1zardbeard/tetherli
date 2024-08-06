export default function CTAe(props){

    const CTAstyle = {
        primary: {
            color: '#ffffff',
            backgroundColor: '#633CFF',
            padding: "12px"
        },
        secondary: {
            color: '#633CFF',
            backgroundColor: '#ffffff',
            padding: "12px"
        }
        
    }

    return(
        <div style={props.type ? CTAstyle.primary : CTAstyle.secondary}>
            <h2>{props.text}</h2>
        </div>
    )
}