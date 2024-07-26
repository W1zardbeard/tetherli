import { useState } from "react";
import TitleDesc from "./loginForm/TitleDesc";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    return(
        <div className="loginForm">
            {/* <!--Make this components --> */}
            <TitleDesc 
                title="Create account"
                subText="Let’s get you started sharing your links!"
            />

        {/*Form */}
        <form action="/api/register" method="POST">

            {/*Email field */}
            <div>            
                <label for="email">Email address</label><br/>
                <input
                    invalid
                    className="formField"
                    style={{backgroundImage: "url('src/assets/icon-email.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                    name="email" 
                    type="email" 
                    placeholder="eg. simon@email.com"
                />
               
            </div>

            {/*Password Field */}    
            <div>            
                <label for="password">Create password</label><br/>
                    <input
                        invalid
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                    />
                   
            </div>

            {/*Submit button */}
            <button className="btnPrimary" type="submit">Create new account</button>

        </form>

        <p>Already have an account? <a href="/">Login</a></p>
           
        </div>
    )
}