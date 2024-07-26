import FormField from "./FormField";

export default function LoginForm(){
    return(
        <div className="loginForm">
            <div className="titleAndDesc">
                <h1>Login</h1>
                <p>Add your details below to get back into the app</p>
            </div>
        <form action="/api/login" method="POST">
            <FormField 
                type="email"
                label="Email address"
            />
            <FormField 
                type="password"
                label="Password"
            />
            <button className="btnPrimary" type="submit">Login</button>
        </form>
            <p>Don’t have an account? <a href="/createAccount">Create account</a></p>
        </div>
    )
}