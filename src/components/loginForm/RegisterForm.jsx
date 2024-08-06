import { useState } from "react";
import TitleDesc from "./TitleDesc";
import CTA from "../CTA";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



//Toggles 

    const [validEmail, setValidEmail] = useState(false);

    //Toggle for the match password visability
    const [matchPassword, setMatchPassword] = useState(false); 
    
    //For disabled button on and off
    const [disabledBtn, setDisabledBtn] = useState(true);

    //For that password match on load fix
    const [confPassBool, setConfPassBool] = useState(false);

  
    //Function so i can run 2 functions from the confirm password onchange event
    function confPassFirstTimeClick(event){
        handleChange(event);

        confPassBoolFunc();
    }

/*function to make sure that the password match doesnt show on page load. After confirm password 
field has changed, then it can show */
    function confPassBoolFunc(){
        if(confPassBool === false){
            setConfPassBool(true);
        }
    }

 



/*Handle change function */
    function handleChange(event){
        const {name, value} = event.target;
        
        switch(name){

            //check if field is email
            case "email":
                setEmail(value);
               
                break;
            
            //check if field is password
            case "password":
                    //if inputted value = the confirm password
                    if(value === confirmPassword){
                        //enable CTA
                        setDisabledBtn(false);  
                        //Turn off message
                        if(confPassBool === true){
                            setMatchPassword(false); 
                        }

                    //if passwords dont match    
                    } else{
                        console.log("Not same");
                        //disable button
                        setDisabledBtn(true);
                        //turn on message
                        if(confPassBool === true){
                            setMatchPassword(true); 
                        }
                        
                    }
                setPassword(value);
                break;

            //check if field is confirm password
            case "confirmPassword":
                    //if inputted value = the  password
                    if(password === value){
                        //enable CTA
                        setDisabledBtn(false);
                        //turn off message
                        setMatchPassword(false); 
                    //if passwords dont match
                    } else{
                        console.log("Not same");
                        //Disable button
                        setDisabledBtn(true);  
                        //Show message
                        setMatchPassword(true); 
                    }
                setConfirmPassword(value);
                break;
        }

        
    }




//===========================================================================================


    return(
        <div className="loginForm">
            <TitleDesc 
                title="Create account"
                subText="Let’s get you started sharing your links!"
            />

        {/*Form */}
        <form action="/api/register" method="POST">

            {/*Email field */}
            <div>            
                <label htmlFor="email">Email address</label><br/>
                <input
                  
                    onChange={handleChange}
                    className="formField"
                    style={{backgroundImage: "url('src/assets/icon-email.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                    name="email" 
                    type="email" 
                    placeholder="eg. simon@email.com"
                    value={email}
                />
               
            </div>

            {/*Password Field */}    
            <div>            
                <label htmlFor="password">Create password</label><br/>
                    <input
                        
                        onChange={handleChange}
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={password}
                    />
                   
            </div>

            {/*Confirm password Field */}    
            <div>            
                <label htmlFor="confirmPassword">Confirm password</label><br/>
                    <input
                        
                        onChange={confPassFirstTimeClick}
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={confirmPassword}
                    />
                     <span className="errorMessage"  style={{visibility:matchPassword && 'visible'}}>Passwords do not match</span>
            </div>

            {/*Submit button */}
            {/* <button disabled={disabledBtn && true} className="btnPrimary" type="submit" >Create new account</button> */}
            <CTA
                type={"submit"}
                style={"primary"}
                text={"Create new account"}
                disabled={disabledBtn}
            />
        </form>

        <p>Already have an account? <a href="/">Login</a></p>
           
        </div>
    )
}