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

    //adding a new link
    function addNewLink(){
        if(userLinks.length < 5){
            setUserLinks(userLinks => [...userLinks, {index: userLinks.length + 1 , type: "github"}])
        }
    }




    //1. Token verification

    useEffect(()=>{
        const token = localStorage.getItem("token");
        console.log(token);
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
        console.log(res.data);
        setUserLinks(res.data);
        
    })

    axios.get("/api/userInfo", { 
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
        
        setUserData(res.data);
    })
        
}, [])











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

                <ProfileEdit />
              
            </div>
        </div>
        
    )
}