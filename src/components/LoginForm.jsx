
import TitleDesc from "./loginForm/TitleDesc";
import { useState } from "react";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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


    return(
        <div className="loginForm">
            <TitleDesc 
                title="Login"
                subText="Add your details below to get back into the app"
            />
        <form action="/api/login" method="POST">

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
            <button className="btnPrimary" type="submit">Login</button>
        </form>
            <p>Don’t have an account? <a href="/createAccount">Create account</a></p>
        </div>
    )
}