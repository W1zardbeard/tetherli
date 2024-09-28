import { useState } from "react";
import TitleDesc from "./TitleDesc";
import CTA from "../CTA";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



//Toggles 
    //init navigation
    const navigate = useNavigate();

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

 



//===========================================================================================
//=============================== Handle Change Function ====================================
//===========================================================================================
    function handleChange(event){
        const {name, value} = event.target;
        switch(name){
            // Check if field is email
            case "email":
                setEmail(value);
                break;
            // Check if field is password
            case "password":
                // If inputted value matches the confirm password
                if(value === confirmPassword){
                    // Enable CTA button
                    setDisabledBtn(false);  
                    // Turn off mismatch message
                    if(confPassBool === true){
                        setMatchPassword(false); 
                    }
                // If passwords don't match    
                } else{
                    console.log("Not same");
                    // Disable CTA button
                    setDisabledBtn(true);
                    // Turn on mismatch message
                    if(confPassBool === true){
                        setMatchPassword(true); 
                    } 
                }
                setPassword(value);
                break;
            // Check if field is confirm password
            case "confirmPassword":
                // If inputted value matches the password
                if(password === value){
                    // Enable CTA button
                    setDisabledBtn(false);
                    // Turn off mismatch message
                    setMatchPassword(false); 
                // If passwords don't match
                } else{
                    console.log("Not same");
                    // Disable CTA button
                    setDisabledBtn(true);  
                    // Show mismatch message
                    setMatchPassword(true); 
                }
                setConfirmPassword(value);
                break;
        }
    }


    // Function to handle the registration process
    const handleRegister = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        try {
            // Make a POST request to the registration endpoint with email and password
            const response = await axios.post('/api/register', {
                email,
                password
            });
            // If the response contains a token
            if (response.data.token) {
                // Store the token in localStorage
                localStorage.setItem('token', response.data.token);
                // Redirect the user to the editor page
                navigate('/editor');
            }
        } catch (err) {
            // Log any errors that occur during the registration process
            toast.error(err.response.data, {
                autoClose: 2000,
                position: "top-center",
            });
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
        <form name="registerForm" onSubmit={handleRegister}>

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