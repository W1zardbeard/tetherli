import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import ProfileEdit from "../components/profile/ProfileEdit";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



export default function ProfileDetails(){

    
    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);
    const navigate = useNavigate();
    const[uploadedImage, setUploadedImage] = useState(0);

    //update the avatar
    function updateAvatar(){
        setUploadedImage(uploadedImage + 1);
    }




    //1. Token verification

    useEffect(()=>{
        const token = localStorage.getItem("token");
         if(!token){
            navigate("/");
            return;
         }

         //verify the token with the backend
         axios.post("/api/verify-token", {}, {
            headers: {Authorization: `Bearer ${token}`}
         })
         .then((res) =>{
            if(res.status !== 200){
                //if token is invalid, redirect to login
                navigate("/");
            }
         })
         .catch((err) => {
            console.error("Token verification failed", err);
            navigate("/");
        })
    }, [navigate]);

   //get links from api
   useEffect(() =>{
    const token = localStorage.getItem("token");
    axios.get("/api/userLinks", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
     
        var responseDataLinks = res.data;
        setUserLinks(res.data);
        
    })

    axios.get("/api/userInfo", { 
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        
        setUserData(res.data);
    })
        
}, [])

//Get avatar/ new data from db once the image is uploaded, basically forcing a re-render
useEffect(() => {
    console.log("ive been triggered ooo");
    const token = localStorage.getItem("token");
    axios.get("/api/userInfo", { 
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        setUserData(res.data);
    })
},[uploadedImage])









    return(
        <div className="editor">
            <Navbar 
                profile={true}
            />
             <div className="mainAreaWrapper">
                <PhonePreview 
                    userDetails={userData}
                    links={userLinks}
                />

                <ProfileEdit 
                    userDetails={userData}
                    updateAvatar={updateAvatar}
                />
              
            </div>
        </div>
        
    )
}