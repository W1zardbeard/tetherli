import Logo from "../components/Logo.jsx";
import LoginForm from "../components/LoginForm.jsx";

export default function Login(){
    return(
        <div className="loginPage">
            <Logo 
                large={true}
                width={"180"}
            />
            <LoginForm />
        </div>
    )
}