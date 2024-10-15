import Logo from "../components/Logo.jsx";
import LoginForm from "../components/loginForm/LoginForm.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";



export default function Login(){

     //init navigate
     const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        // If a token is found, navigate to the share page
        if (token) {
            try {
                axios.post("/api/verify-token", {}, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    if (res.status === 200) {
                        navigate("/admin");
                    }
                })
                .catch((err) => {
                    toast.error(err.response.data, {
                        autoClose: 2000,
                        position: "top-center",
                    });
                });
            } catch (err) {
                toast.error("Token verification failed");
            }
        } else if (!token) {
            console.log("No token found");
            navigate("/");
        }
        
    }, []);

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