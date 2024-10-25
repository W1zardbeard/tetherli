import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from "axios";

export default function Editor(){

    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);
    const[forceUpdate, setForceUpdate] = useState(0);
    const navigate = useNavigate();

    // ============================
    // Function to add a new link
    // ============================
    function addNewLink(){
        // Generate a random ID for the link
        const randomId = Math.floor(Math.random() * 1000) + 1;
        // Retrieve the user ID from userData or use a default value if not available
        const userId = userData.id || 'defaultUserId'; // Replace 'defaultUserId' with a fallback if userData.id is not available
        // Concatenate the random ID with the user ID to create a unique link ID
        const linkIdGen = `${randomId}${userId}`;     
        // Create a new link object and add it to the userLinks array if the length is less than 5
        if(userLinks.length < 5){
            setUserLinks(userLinks => [...userLinks, {link_id: linkIdGen , type: "github"}]);
        }
    }

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

        // ***********************
        // 2. Fetch user links and data
        // ***********************
        .then(() => { 
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
        })
        .catch((err) => {
            // Log any errors and navigate to the login page
            navigate("/");
        });
    }, [navigate]);

    // ============================
    // Function to set the type of a link
    // ============================
    function setNewLink(selection, linkId){
        // Find the index of the link to be updated
        var indexOfSelected = userLinks.findIndex(x => x.link_id === linkId);
        // Create a new array with the updated link type
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.link_id === linkId){
                return {
                    ...userLinkItem,
                    type: selection,       
                };
            } else {
                return userLinkItem;
            }
        });

        // Update the state with the new array
        setUserLinks(newArray);
    }

    // ============================
    // Function to update the URL of a link
    // ============================
    function updateLink(value, linkId){
        // Find the index of the link to be updated
        var indexOfSelected = userLinks.findIndex(x => x.index === linkId);
        
        // Create a new array with the updated link
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.link_id === linkId){
                return {
                    ...userLinkItem,
                    link: value,       
                };
            } else {
                return userLinkItem;
            }
        });
        
        // Update the state with the new array
        setUserLinks(newArray);
    }

    // ============================
    // Function to save links to the backend
    // ============================
    function saveLinks(){
        // Retrieve the token from local storage
        const token = localStorage.getItem("token");

        // Check if links begin with http, https, or www.
        for (let i = 0; i < userLinks.length; i++) {
            const link = userLinks[i].link;

            if (link.startsWith("http://") || link.startsWith("https://")) {
                console.log("good to go");
            } else if (link.startsWith("www.")) {
                
                userLinks[i].link = "https://" + link;
            } else {
                userLinks[i].link = "https://www." + link;
            }
        }
        
        // Make a POST request to save the userLinks
        axios.post("/api/saveLinks", {userLinks}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            // Handle the response here
            // If the response status is 200, show a success message
            
            toast.success("Link(s) saved successfully", {
                autoClose: 2000,
                position: "top-center",
            });
        
        })
        .catch((err) => {
            // Handle any errors here
        
            toast.error("Error saving links", {
                autoClose: 2000,
                position: "top-center",
            });
        });
    }

    // ============================
    // Function to remove a link from the userLinks array using link_id
    // ============================
    function removeLink(link_id){
        // Filter out the link with the specified link_id
        const updatedLinks = userLinks.filter((link) => link.link_id !== link_id);
        
        console.log(link_id);

        // Retrieve the token from local storage
        const token = localStorage.getItem("token");
        //make post request to remove link
        axios.post("/api/removeLink", {link_id}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            // Handle the response here
            // Show a toast notification indicating successful removal
            toast.success("Link removed successfully", {
                autoClose: 2000,
                position: "top-center",
            });
             // Update the state with the new array of links
            setUserLinks(updatedLinks);
        })
        .catch((err) => {
            // Handle any errors here
            toast.error("Error removing link", {
                autoClose: 2000,
                position: "top-center",
            });
        });
    }
   
    // ============================
    // Return part of the component
    // ============================
    return(
        <div className="editor">
            <Navbar 
                editor={true}
                username={userData.username}
            />
            <div className="mainAreaWrapper">
                <PhonePreview 
                    userDetails={userData}
                    links={userLinks}
                />
 
                <EditArea 
                    links={userLinks}
                    addNewLink={addNewLink}
                    setNewLink={setNewLink}
                    updateLink={updateLink}
                    saveLinks={saveLinks}
                    removeLink={removeLink}
                />
                
            </div>
            <ToastContainer />
        </div>
        
    )
}