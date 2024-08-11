import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";
import { useEffect, useState } from "react";

import axios from "axios";





export default function Editor(){

    const [userData, setUserData] = useState({});

   
    useEffect(() =>{
        axios.get("/api/mockuserData").then((res) => {
            console.log(res.data);
            setUserData(res.data)
        })
    }, [])
   


  
    return(
        <div className="editor">
            <Navbar 
                editor={true}
            />
            <div className="mainAreaWrapper">
                <PhonePreview 
                    userDetails={userData}
                />
                <EditArea />
            </div>
        </div>
        
    )
}