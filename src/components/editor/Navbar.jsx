import {React, useState } from "react";
import Logo from "../Logo";
import NavLink from "./NavLink";
// import CTAe from "./ctaExample";
import CTA from "../CTA";

export default function Navbar(props){

    const [linksActiveLink, setLinksActiveLink] = useState(props.editor);
    const [profileActiveLink, setProfileActiveLink] = useState(props.profile);

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
   
    return(
        <div className="navbar">
            <Logo 
                large={true}
                width={146}
                editor={true}
            />

            {/* <CTAe 
                type={false}
                text={"Link"}
                href={props.linkTo}
            /> */}
            <div className="navLinksCont">
                <NavLink 
                    onClick={handleClick}
                    active={linksActiveLink}
                    text={"Links"}
                    imgSrc={"src/assets/icon-links-header.svg"}
                    linkTo={"Editor"}
                    
                />

                <NavLink 
                    onClick={handleClick}
                    active={profileActiveLink}
                    text={"Profile Details"}
                    imgSrc={"src/assets/icon-profile-details-header.svg"}
                    linkTo={"profileDetails"}
                />
            </div>
            <CTA
                text={"Preview"}
                style={"secondary"}
                icon={true}
            
                
            />
      
        </div>
    )
}