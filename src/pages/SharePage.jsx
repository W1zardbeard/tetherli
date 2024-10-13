import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SharePage(){

    const url = window.location.href;
    const username = url.split("/").pop();

    useEffect(() => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Fetch user links from the backend
        axios.get(`/api/${username}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
            console.log(err)
        });

       
    }, []);


    return(
        <div className="sharePage">
            <div className="sharePageContent">
                <h1>username is {username} </h1>
                
            </div>
            <ToastContainer />
        </div>
    )
}