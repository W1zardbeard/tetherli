import { useState } from "react";

export default function FormField(props){

    const [showHide, setShowHide] = useState(false);

    function showHider(){
        setShowHide((prevValue) => {
            return !prevValue;
        })
    }

    var isError = true;

    if (props.type === "email"){
        return(
            <>
            <div>            
                <label for="email">Email</label><br/>
                <input
                    invalid
                    className="formField"
                    style={{backgroundImage: "url('src/assets/icon-email.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 12px" }}
                    name="email" 
                    type="email" 
                    
                />
                <span className="errorMessage"  style={{visibility:showHide && 'visible'}}>Please enter a valid email</span>
        
            </div>
                    <button 
                    onClick={showHider}>show hide</button>
                    </>
        )
    }
    
}