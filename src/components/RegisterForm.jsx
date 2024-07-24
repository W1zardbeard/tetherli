import FormField from "./FormField";

export default function LoginForm(){
    return(
        <div className="loginForm">
            <div className="titleAndDesc">
                <h1>Create account</h1>
                <p>Let’s get you started sharing your links!</p>
            </div>
        <form action="/api/register" method="POST">
            <FormField 
                type="email"
            />
            <FormField 
                type="password"
            />
            <button className="btnPrimary" type="submit">Create new account</button>
        </form>

        <p>Already have an account? <a href="/">Login</a></p>
           
        </div>
    )
}