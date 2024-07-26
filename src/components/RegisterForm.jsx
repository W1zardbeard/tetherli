import { useState } from "react";
import TitleDesc from "./loginForm/TitleDesc";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [disabledBtn, setDisabledBtn] = useState(true);

    function handleChange(event){
        const {name, value} = event.target;
        
        switch(name){
            case "email":
                setEmail(value);
                break;
            case "password":
                    if(value === confirmPassword){
                        console.log("Same wooo");
                        
                    } else{
                        console.log("Not same");
                    }
                setPassword(value);
                break;
            case "confirmPassword":
                    if(password === value){
                        console.log("Same wooo");
                        
                    } else{
                        console.log("Not same");
                    }
                setConfirmPassword(value);
                break;
        }
    }

    function alerter(){
        alert("Email: " + email + " Password: " + password + " ConfirmPassword: " + confirmPassword);
      
    }



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
                <label htmlFor="password">Confirm password</label><br/>
                    <input
                        onChange={handleChange}
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Enter your password" 
                        value={confirmPassword}
                    />
                   
            </div>

            {/*Submit button */}
            <button disabled={disabledBtn && true} className="btnPrimary" type="submit" onClick={alerter}>Create new account</button>

        </form>
        <button className="btnPrimary"  onClick={alerter}>Alert me</button>

        <p>Already have an account? <a href="/">Login</a></p>
           
        </div>
    )
}