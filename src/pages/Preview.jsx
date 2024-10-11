import React from 'react';
import SaveEditBar from '../components/editor/SaveEditBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviewNav from '../components/preview/PreviewNav';
import FinalLinkPreview from '../components/preview/FinalLinkPreview';
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CopyLink from "../components/preview/CopyLink"



export default function Preview() {

    //user data
    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);

    //init navigate
    const navigate = useNavigate();


    // ============================
    // 1. Token verification
    // ============================

    useEffect(() => {
        // Retrieve the token from local storage
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



    // ============================
    // Fetch user links and user info from the API
    // ============================
    useEffect(() => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Fetch user links from the backend
        axios.get("/api/userLinks", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // Store the retrieved links in the state
            setUserLinks(res.data);
        })
        .catch((err) => {
            toast.error("Error fetching links", {
                autoClose: 2000,
                position: "top-center",
            });
        });

        // Fetch user info from the backend
        axios.get("/api/userInfo", { 
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            // Store the retrieved user info in the state
            setUserData(res.data);
        })
        .catch((err) => {
           toast.error("Error fetching user info", {
                autoClose: 2000,
                position: "top-center",
            });
        });
    }, []);


    //function copy to clipboard
    function copyToClipboard() {
        navigator.clipboard.writeText(`tetherli/${username}`);
        console.log("Copied to clipboard");
        toast.success("Link copied to clipboard", {
            autoClose: 2000,
            position: "top-center",
        });
    }

  



    

    //get username from url
    const url = window.location.href;
    const username = url.split("/").pop();
    console.log(username);

  return (
    <div className='editor previewPage'>
        <PreviewNav />
        <FinalLinkPreview 
            userDetails={userData}
            links={userLinks}
        />

        <CopyLink 
            username={username}
            clickHandler={copyToClipboard}
        />
        <ToastContainer />
    </div>
  );
}