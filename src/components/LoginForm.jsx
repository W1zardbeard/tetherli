
import TitleDesc from "./loginForm/TitleDesc";

export default function LoginForm(){
    return(
        <div className="loginForm">
            <div className="titleAndDesc">
                <h1>Login</h1>
                <p>Add your details below to get back into the app</p>
            </div>
        <form action="/api/login" method="POST">

            {/*Email field */}
            <div>            
                <label for="email">Email address</label><br/>
                <input
                    
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
                        
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-password.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="password" 
                        type="password" 
                        placeholder="Enter your password" 
                    />
                   
            </div>
            <button className="btnPrimary" type="submit">Login</button>
        </form>
            <p>Don’t have an account? <a href="/createAccount">Create account</a></p>
        </div>
    )
}