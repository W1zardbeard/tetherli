import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";

import axios from "axios";





export default function Editor(){

    var userID = 9;

    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState([]);

    //adding a new link
    function addNewLink(){
        if(userLinks.length < 5){
            setUserLinks(userLinks => [...userLinks, {index: userLinks.length + 1 , type: "github"}])
        }
    }

   //get links from api
    useEffect(() =>{
        axios.get("/api/userLinks", {
            params:{
                id: userID
            }
        })
        .then((res) => {
          
            var responseDataLinks = res.data;
            console.log(res.data);
            setUserLinks(res.data);
            
        })

        axios.get("/api/userInfo", { 
            params:{
                id: userID
            }
        })
        .then((res) => {
            
            setUserData(res.data[0]);
        })
            
    }, [])



    //setNewlink type
    function setNewLink(selection, indexOfSelectionChange){
        console.log(userLinks);
        var indexOfSelected = userLinks.findIndex(x => x.index === indexOfSelectionChange);
        console.log(selection);
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

    function saveLinks(){
        alert("hello i am saving good things");
        axios.post("/api/saveLinks", userLinks)
    }
   
    console.log(userLinks);
  

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
                />
            </div>
        </div>
        
    )
}