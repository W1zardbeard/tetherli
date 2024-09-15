import UploadAvatar from "./UploadAvatar"
import AvatarUpload from "./UploadAvatar"


export default function AvatarEdit(props){
    return(
        <div className="profileEditSection">
            <p>Profile picture</p>

            {props.avatar ? 
            <UploadAvatar  
                updateAvatar={props.updateAvatar} 
                uploaded={true} 
                avatar={props.avatar}
            /> 
            : 
            <UploadAvatar 
                updateAvatar={props.updateAvatar} 
                uploaded={false}
            />}
        </div>
    )
}