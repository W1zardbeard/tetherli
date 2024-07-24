import Logo from "../components/Logo.jsx";
import RegisterForm from "../components/RegisterForm.jsx";

export default function Register(){
    return(
        <div className="loginPage">
            <Logo 
                large={true}
                width={"180"}
            />
            <RegisterForm />
        </div>
    )
}