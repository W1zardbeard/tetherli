import {React, useState } from "react";
import Logo from "../Logo";
import NavLink from "./NavLink";
// import CTAe from "./ctaExample";
import CTA from "../CTA";
import { useNavigate } from 'react-router-dom';

export default function Navbar(props){

    const [linksActiveLink, setLinksActiveLink] = useState(props.editor);
    const [profileActiveLink, setProfileActiveLink] = useState(props.profile);

    //init navigate  
    const navigate = useNavigate();

    function handleClick(link){
        switch(link){
            case "links":
                setLinksActiveLink(true);
                setProfileActiveLink(false);
                break;
            case "profileDetails":
                setLinksActiveLink(false);
                setProfileActiveLink(true);
                break;
        }
       
        

    }
   
    //create preview page based on user username
    function previewOpen(){
         navigate("/preview/" + `${props.username}`);
    }



    return(
        <div className="navbar">
            <a href="/">
            <Logo 
                large={true}
                width={146}
                editor={true}
            />
            </a>

            
            <div className="navLinksCont">
                <NavLink 
                    onClick={handleClick}
                    active={linksActiveLink}
                    text={"Links"}
                    imgSrc={"../src/assets/icon-links-header.svg"}
                    linkTo={"../admin"}
                    
                />

                <NavLink 
                    onClick={handleClick}
                    active={profileActiveLink}
                    text={"Profile Details"}
                    imgSrc={"../src/assets/icon-profile-details-header.svg"}
                    linkTo={"admin/profileDetails"}
                />
            </div>
            <CTA
                text={"Preview"}
                style={"secondary"}
                icon={true}
                clickHandler={previewOpen}
                
            />
      
        </div>
    )
}