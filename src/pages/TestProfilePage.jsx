//test page which displays the users username based on the url

import React from 'react';
import SaveEditBar from '../components/editor/SaveEditBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TestProfilePage(){

    //get username from url
    const url = window.location.href;
    const username = url.split("/").pop();
    console.log(username);

    function fireToast(){
      
        toast.loading("Saved Successfully", {
            autoClose: 2000,
            position: "top-center",
        })
    }

    return(
        <div>
            <ToastContainer />
            <h1>{username}</h1>
            <SaveEditBar 
                save={fireToast}
            />
        </div>
    )
}

