import TitleDesc from "../loginForm/TitleDesc"
import AvatarEdit from "./AvatarEdit"
import DetailsEdit from "./DetailsEdit"
import SaveEditBar from "../editor/SaveEditBar"
import { useState, useEffect } from "react"
import MoonLoader from "react-spinners/MoonLoader";




export default function ProfileEdit(props){

   

    return(
        <div className="editArea">
            <TitleDesc 
                title="Profile Details"
                subText="Add your details to create a personal touch to your profile."
            />
            {props.loading ?

            <div className="loaderContainer">
            <MoonLoader 
                color={"#633CFF"} 
                loading={props.loading} 
                size={40} 
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>  
            :
                <>
            <AvatarEdit 
                avatar={props.userDetails.avatar}
                updateAvatar={props.updateAvatar}
            />

            <DetailsEdit 
                userDetails={props.userDetails}
                updateDetails={props.updateDetails}
                updateShowName={props.updateShowName}
                updateShowEmail={props.updateShowEmail}
            />
            </>
            }



            <SaveEditBar 
                save={props.saveDetails}
            />
            </div>

            
    )
}