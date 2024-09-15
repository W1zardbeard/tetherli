import TitleDesc from "../loginForm/TitleDesc"
import AvatarEdit from "./AvatarEdit"




export default function ProfileEdit(props){
    return(
        <div className="editArea">
            <TitleDesc 
                title="Profile Details"
                subText="Add your details to create a personal touch to your profile."
            />

            <AvatarEdit 
                avatar={props.userDetails.avatar}
            />
            </div>
    )
}