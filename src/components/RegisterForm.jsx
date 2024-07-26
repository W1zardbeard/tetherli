import { useState } from "react";

export default function LoginForm(){
    const [details, setDetails] = useState({
        email: "",
        password: ""
    })




    return(
        <div className="loginForm">
            {/* <!--Make this components --> */}
            <div className="titleAndDesc">
                <h1>Create account</h1>
                <p>Let’s get you started sharing your links!</p>
            </div>

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