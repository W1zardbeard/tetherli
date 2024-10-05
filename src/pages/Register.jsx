import Logo from "../components/Logo.jsx";
import RegisterForm from "../components/loginForm/RegisterForm.jsx";
import UsernameForm from "../components/loginForm/UsernameForm.jsx";
import NamesForm from "../components/loginForm/NamesForm.jsx";
import AvatarForm from "../components/loginForm/avatarForm.jsx";
import Finished from "../components/loginForm/Finished.jsx";
import{ useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register(){

    // State to store the page flow
    const [pageFlow, setPageFlow] = useState("register");

    //function to change the page flow\
    function changePageFlow(page){
        setPageFlow(page);
    }
 
    // Function to switch between the forms
    switch (pageFlow){
        case "register":
            return(
                <div className="loginPage">
                    <Logo 
                        large={true}
                        width={"180"}
                    />
                    <RegisterForm 
                        setPageFlow={changePageFlow}
                    />
                    <ToastContainer />
                </div>
            )	
          break;
        case "username":
            return(
                <div className="loginPage">
                    <Logo 
                        large={true}
                        width={"180"}
                    />
                    <UsernameForm 
                        setPageFlow={changePageFlow}
                    />
                    <ToastContainer />
                </div>
            )
            break;  
        case "names":
            return(
                <div className="loginPage">
                    <Logo 
                        large={true}
                        width={"180"}
                    />
                    <NamesForm 
                        setPageFlow={changePageFlow}
                    />
                    <ToastContainer />
                </div>
            )
            break;
        case "avatar":
            return(
                <div className="loginPage">
                    <Logo 
                        large={true}
                        width={"180"}
                    />
                    <AvatarForm 
                        setPageFlow={changePageFlow}
                    />
                    <ToastContainer />
                </div>
            )
            break;
        case "finished":
            return(
                <div className="loginPage">
                    <Logo 
                        large={true}
                        width={"180"}
                    />
                    <Finished />
                    <ToastContainer />
                </div>
            )
            break;
    }
       
}