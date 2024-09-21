import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";





export default function Editor(){

    

    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);
    const[forceUpdate, setForceUpdate] = useState(0);
    const navigate = useNavigate();

    //adding a new link
    function addNewLink(){
     
        //generate random id for the link
        const randomId = Math.floor(Math.random() * 1000) + 1;
        const userId = userData.id || 'defaultUserId'; // Replace 'defaultUserId' with a fallback if userData.id is not available
        //concatenate the random id with the user id
        const linkIdGen = `${randomId}${userId}`;
        console.log(linkIdGen);
        //make new link object
        if(userLinks.length < 5){
            setUserLinks(userLinks => [...userLinks, {link_id: linkIdGen , type: "github"}])
        }
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



    //setNewlink type
    function setNewLink(selection, linkId){
        console.log(selection, linkId);
        var indexOfSelected = userLinks.findIndex(x => x.link_id === linkId);
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.link_id === linkId){
                return{
                    ...userLinkItem,
                    type: selection,       
                };
            } else {
                return userLinkItem;
            }
        });
        setUserLinks(newArray);
    }

    //update url
    function updateLink(value, linkId){
        var indexOfSelected = userLinks.findIndex(x => x.index === linkId);
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.link_id === linkId){
                return{
                    ...userLinkItem,
                    link: value,       
                };
            } else {
                return userLinkItem;
            }
        });
        setUserLinks(newArray);
    }

    //saving links
    function saveLinks(){
        const token = localStorage.getItem("token");
        axios.post("/api/saveLinks", {userLinks}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            // Handle the response here
            //if 200 then show success message
            
            console.log(res.status);
        })
        .catch((err) => {
            // Handle any errors here
            console.error("Error saving links", err);
        });
       
    }

   

  //remove link from user link array using index
    function removeLink(link_id){
        const updatedLinks = userLinks.filter((link) => link.link_id !== link_id);
    
        setUserLinks(updatedLinks);
    }
   


    return(
        
        <div className="editor">
            <Navbar 
                editor={true}
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
        </div>
        
    )
}