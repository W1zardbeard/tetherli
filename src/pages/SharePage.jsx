import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShareNav from '../components/sharePage/shareNav';
import FinalLinkPreview from '../components/preview/FinalLinkPreview';
import { useNavigate } from "react-router-dom";
import NavCard from '../components/preview/NavCard';
import MoonLoader from "react-spinners/MoonLoader";

export default function SharePage(){


    // Loading state
    const [loading, setLoading] = useState(true);

    // Get the username from the URL
    const url = window.location.href;
    const username = url.split("/").pop();

    //user data
    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);

    //init navigate
    const navigate = useNavigate();

    useEffect(() => {
        
        // Fetch user links from the backend
        axios.get(`/api/${username}`)
        .then((res) => {
           
          setUserData(res.data);
          setUserLinks(res.data.links);
          
          setLoading(false);
        
        })
        .catch((err) => {
            if(err.status === 404){
                navigate("/user-not-found");
            }
        });

       
    }, []);


    
    return(
       
        <div className='editor previewPage'>
            <ShareNav />

            {/* Display the loading spinner */}
            {loading ? 
                <MoonLoader 
                    color={"#633CFF"} 
                    loading={loading} 
                    size={40} 
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> 
            : 
                <FinalLinkPreview 
                    userDetails={userData}
                    links={userLinks}
                />
            }
            

            <NavCard />
            <ToastContainer />
        </div>
    )
}