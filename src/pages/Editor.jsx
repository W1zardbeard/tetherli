import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";

import axios from "axios";





export default function Editor(){

    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState();

    //adding a new link
    function addNewLink(){
        if(userLinks.length < 5){
            setUserLinks(userLinks => [...userLinks, {index: userLinks.length + 1 , type: "github"}])
        }
    }

   //get links from api
    useEffect(() =>{
        axios.get("/api/mockuserData").then((res) => {
            var responseDataLinks = res.data.links;
    
            var indexAddedLinks = responseDataLinks.map((pulledLinks, index) =>{
                return{
                    index: index + 1,
                    ...pulledLinks,
                }
            })
  
            setUserLinks(indexAddedLinks)
            setUserData(res.data);
        })
    }, [])



    //setNewlink
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
                />
            </div>
        </div>
        
    )
}