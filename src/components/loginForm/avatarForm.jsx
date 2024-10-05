import {React, useState, useEffect} from 'react';
import TitleDesc from './TitleDesc';
import UploadAvatar from '../profile/UploadAvatar';
import CTA from '../CTA';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AvatarForm(props){


    // State to store user data
    const [userData, setUserData] = useState({});

    // State to store disabled button state
    const [disabledBtn, setDisabledBtn] = useState(true);

     // State to trigger re-render when an image is uploaded
    const [uploadedImage, setUploadedImage] = useState(0);

    // Hook to navigate programmatically
    const navigate = useNavigate();

    // Function to update the avatar
    function updateAvatar(){
        setDisabledBtn(false);
        // Increment the uploadedImage state to trigger a re-render
        setUploadedImage(uploadedImage + 1);
    }



// ***********************
// 1. Token verification
// ***********************
    useEffect(() => {
        // Retrieve token from local storage
        const token = localStorage.getItem("token");
        // If no token is found, navigate to the login page
        if (!token) {
            navigate("/");
            return;
        }
        // Verify the token with the backend
        axios.post("/api/verify-token", {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // If the token is invalid, navigate to the login page
            if (res.status !== 200) {
                navigate("/");
            }
        })
        .catch((err) => {
            // Log any errors and navigate to the login page
            console.error("Token verification failed", err);
            navigate("/");
        });
    }, [navigate]);

// ***********************
// 3. Get avatar/new data from db once the image is uploaded, basically forcing a re-render
// ***********************
useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    
    // Fetch updated user data from the API
    axios.get("/api/userInfo", { 
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        // Store the response data in the userData state
        setUserData(res.data);
    })
    .catch((err) => {
        // Log any errors and display a toast notification
       
    });
}, [uploadedImage]);





    return(
        <div className='loginForm'>
            <TitleDesc 
                title="Add profile picture"
                subText="This is what people will see when you share a link"
            />
            <form name="registerForm" >
                <div className="avatarAndHelp fixedAvatar">


                {userData.avatar ? 
                <UploadAvatar  
                    updateAvatar={updateAvatar} 
                    uploaded={true} 
                    avatar={userData.avatar}
                /> 
                : 
                <UploadAvatar 
                    updateAvatar={updateAvatar} 
                    uploaded={false}
                />}

                </div>
                <CTA
                type={"submit"}
                style={"primary"}
                text={"Next"}
                disabled={disabledBtn}
                clickHandler={() => props.setPageFlow("finished")}
            />
            </form>
        </div>
    )
}