import FormField from "./FormField";

export default function LoginForm(){
    return(
        <div className="loginForm">
            <div className="titleAndDesc">
                <h1>Login</h1>
                <p>Add your details below to get back into the app</p>
            </div>

            <FormField 
                type="email"
            />
        </div>
    )
}