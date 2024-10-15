import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShareNav from '../components/sharePage/shareNav';
import FinalLinkPreview from '../components/preview/FinalLinkPreview';
import { useNavigate } from "react-router-dom";
import NavCard from '../components/preview/NavCard';

export default function SharePage(){

    // Get the username from the URL
    const url = window.location.href;
    const username = url.split("/").pop();

    //user data
    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);

    //init navigate
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Fetch user links from the backend
        axios.get(`/api/${username}`)
        .then((res) => {
            console.log(res.data);
          setUserData(res.data);
          setUserLinks(res.data.links);
        
        })
        .catch((err) => {
            console.log(err)
        });

       
    }, []);

    
    return(
        <div className='editor previewPage'>
            <ShareNav />
            <FinalLinkPreview 
            userDetails={userData}
            links={userLinks}
        />
            

            <NavCard />
            <ToastContainer />
        </div>
    )
}