import Logo from "../components/Logo.jsx";
import RegisterForm from "../components/loginForm/RegisterForm.jsx";
import UsernameForm from "../components/loginForm/UsernameForm.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){
    return(
        <div className="loginPage">
            <Logo 
                large={true}
                width={"180"}
            />
            <UsernameForm />
            {/* <RegisterForm /> */}
            <ToastContainer />
        </div>
    )
}