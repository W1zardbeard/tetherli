import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";

import axios from "axios";





export default function Editor(){

    const [userData, setUserData] = useState({});
    const [userLinks, setUserLinks] = useState();

    function addNewLink(){
        //userLinks.push({type: "github", link: "boobs"});
        // console.log("push");
        setUserLinks(userLinks => [...userLinks, {type: "github"}])
        console.log(userLinks);
    }

   
    useEffect(() =>{
        axios.get("/api/mockuserData").then((res) => {
            setUserData(res.data);
        })
    }, [])

    useEffect(() => {
        setUserLinks(userData.links);
    },[userData])
   

  

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
                />
            </div>
        </div>
        
    )
}