import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";





export default function Editor(){

    

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
    function setNewLink(selection, indexOfSelectionChange){
        var indexOfSelected = userLinks.findIndex(x => x.index === indexOfSelectionChange);
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.index === indexOfSelected + 1){
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
    function updateLink(value, indexOfUpdate){
        var indexOfSelected = userLinks.findIndex(x => x.index === indexOfUpdate);
        const newArray = userLinks.map(userLinkItem => {
            if(userLinkItem.index === indexOfSelected + 1){
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
        console.log(userLinks);

        axios.post("/api/saveLinks", {userLinks}, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            // Handle the response here
            console.log(res.data);
        })
        .catch((err) => {
            // Handle any errors here
            console.error("Error saving links", err);
        });
       
    }

    //removing links
    function removeLink(indexOfRemove){
        console.log(indexOfRemove);
        // var indexOfSelected = userLinks.findIndex(x => x.index === indexOfRemove);
        // const newArray = userLinks.filter(userLinkItem => userLinkItem.index !== indexOfSelected + 1);
       
        // setUserLinks(newArray);
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