import AvatarUpload from "./UploadAvatar"


export default function AvatarEdit(props){
    return(
        <div className="profileEditSection">
            <p>Profile picture</p>

            {props.avatar ? <h1>Avatar</h1> : <AvatarUpload />}
        </div>
    )
}