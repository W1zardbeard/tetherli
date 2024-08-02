

export default function FormField(props){


    var isError = true;

    if (props.type === "email"){
        return(
           
            <div>            
                <label for="email">{props.label}</label><br/>
                <input
                    invalid
                    className="formField"
                    style={{backgroundImage: "url('src/assets/icon-email.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                    name="email" 
                    type="email" 
                    placeholder="eg. simon@email.com"
                    
                />
                <span className="errorMessage" /*</div> style={{visibility:showHide && 'visible'}}*/>Please enter a valid email</span>
        
            </div>
                   
        )
    } else if (props.type === "password"){
        return(
            <div>            
            <label for="password">{props.label}</label><br/>
            <input
                invalid
                className="formField"
                style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                name="password" 
                type="password" 
                placeholder="Enter your password"
                
            />
            <span className="errorMessage" /*</div> style={{visibility:showHide && 'visible'}}*/>Please enter a valid email</span>
    
        </div>
        )
    }
    
}