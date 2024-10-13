import Logo from "../components/Logo.jsx";
import LoginForm from "../components/loginForm/LoginForm.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Login(){
    return(
        <div className="loginPage">
            <Logo 
                large={true}
                width={"180"}
            />
            <LoginForm />
            <ToastContainer />
        </div>
    )
}