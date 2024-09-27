import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import ProfileEdit from "../components/profile/ProfileEdit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function ProfileDetails(){

    
    // State to store user data
    const [userData, setUserData] = useState({});
    // State to store user links
    const [userLinks, setUserLinks] = useState([]);
    // Hook to navigate programmatically
    const navigate = useNavigate();
    // State to trigger re-render when an image is uploaded
    const [uploadedImage, setUploadedImage] = useState(0);



    // ***********************
    // Function to update the avatar
    // ***********************
    function updateAvatar(){
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
// 2. Fetch user links and data
// ***********************
useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Fetch user links from the API
    axios.get("/api/userLinks", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        // Store the response data in the userLinks state
        setUserLinks(res.data);
    })
    .catch((err) => {
        // Log any errors and display a toast notification
        toast.error("Error fetching links", {
            autoClose: 2000,
            position: "top-center",
        });
    });

    // Fetch user data from the API
    axios.get("/api/userInfo", { 
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        // Store the response data in the userData state
        setUserData(res.data);
    })
    .catch((err) => {
        // Log any errors and display a toast notification
        toast.error("Error fetching user data", {
            autoClose: 2000,
            position: "top-center",
        });
    });
}, []);




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
        toast.error("Error fetching user data", {
            autoClose: 2000,
            position: "top-center",
        });
    });
}, [uploadedImage]);


// ***********************
// Function to update user details based on input changes
// ***********************
function updateDetails(event){
    // Destructure name and value from the event target
    const { name, value } = event.target;

    // Update the corresponding userData field based on the input name
    if (name === "firstName") {
        setUserData({ ...userData, first_name: value });
    } else if (name === "lastName") {
        setUserData({ ...userData, last_name: value });
    } else if (name === "email") {
        setUserData({ ...userData, email: value });
    } else if (name === "username") {
        setUserData({ ...userData, username: value });
    }
}


// ***********************
// Function to save user details
// ***********************
function saveDetails(){
    // Retrieve token from local storage
    const token = localStorage.getItem("token");

    // Send a POST request to update user information
    axios.post("/api/updateUserInfo", userData, {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        // Log a success message when user details are updated
        toast.success("User details updated", {
            autoClose: 2000,
            position: "top-center",
        });
    })
    .catch((err) => {
        // Log any errors that occur during the update
        toast.error(err.response.data, {
            autoClose: 2000,
            position: "top-center",
        });
    });
}







    return(
        <div className="editor">
            <Navbar 
                profile={true}
                username={userData.username}
            />
             <div className="mainAreaWrapper">
                <PhonePreview 
                    userDetails={userData}
                    links={userLinks}
                />

                <ProfileEdit 
                    userDetails={userData}
                    updateAvatar={updateAvatar}
                    saveDetails={saveDetails}
                    updateDetails={updateDetails}
                />
              
            </div>
            <ToastContainer />
        </div>
        
    )
}