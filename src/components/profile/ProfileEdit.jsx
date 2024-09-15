import TitleDesc from "../loginForm/TitleDesc"
import AvatarEdit from "./AvatarEdit"
import { useState, useEffect } from "react"




export default function ProfileEdit(props){

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
            </div>
    )
}