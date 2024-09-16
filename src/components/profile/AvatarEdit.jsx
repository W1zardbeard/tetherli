import UploadAvatar from "./UploadAvatar"
import AvatarUpload from "./UploadAvatar"


export default function AvatarEdit(props){
    return(
        <div className="profileEditSection">
            <p>Profile picture</p>

            <div className="avatarAndHelp">
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
                <p className="bodySmall">Image must be below 1mb. <br/>Use PNG, JPG or GIF format.</p>
            </div>
            
        </div>
    )
}