
import TitleDesc from "./TitleDesc";
import { useState } from "react";
import CTA from "../CTA"
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleChange(event){
        const{name, value} = event.target;

        switch (name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                email,
                password
            });

            if (response.data.token) {
                // Store the token (in localStorage or sessionStorage)
                localStorage.setItem('token', response.data.token);

                // Redirect the user to the editor page
                navigate('/editor');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Invalid email or password');
        }
    };

    return(
        <div className="loginForm">
            <TitleDesc 
                title="Login"
                subText="Add your details below to get back into the app"
            />
        <form name="loginForm" onSubmit={handleLogin}>

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
                <label htmlFor="password">Password</label><br/>
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
          
            <CTA 
                text={"Login"}
                style={"primary"}
                onClick={handleLogin}
                type={"submit"}
            />
          
        </form>
            <p>Don’t have an account? <a href="/createAccount">Create account</a></p>
        </div>
    )
}