import TitleDesc from "../loginForm/TitleDesc"
import AvatarEdit from "./AvatarEdit"
import DetailsEdit from "./DetailsEdit"
import SaveEditBar from "../editor/SaveEditBar"
import { useState, useEffect } from "react"




export default function ProfileEdit(props){

    console.log(props.userDetails);


    return(
        <div className="editArea">
            <TitleDesc 
                title="Profile Details"
                subText="Add your details to create a personal touch to your profile."
            />

            <AvatarEdit 
                avatar={props.userDetails.avatar}
                updateAvatar={props.updateAvatar}
            />

            <DetailsEdit 
                userDetails={props.userDetails}
            />

##################################
||                              ||
||SORT OUT SAVE BAR FOR THIS BIT||
||                              ||
##################################

<SaveEditBar 
                saveLinks={props.saveLinks}
            />
            </div>

            
    )
}