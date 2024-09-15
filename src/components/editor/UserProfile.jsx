export default function UserProfile(props){
    const avatarPath = props.userDetails?.avatar ? encodeURI(props.userDetails.avatar.trim()) : '';
    const style = {
        backgroundImage: `url(server/${avatarPath})`,
        backgroundSize: 'cover',
    }

    console.log(props.userDetails?.avatar)

    return(
        <div className="userProfile">
            {props.userDetails?.avatar ? <div className="userAvatar" style={style}></div> :  <div className="userAvatar"></div>}
            <div className="details">
                {props.userDetails?.name ? <h2>{props.userDetails.name}</h2> : <div className="empty emptyDetails emptyName"></div>}
                {props.userDetails?.email ? <p className="bodySmall">{props.userDetails.email}</p> :<div className=" empty emptyDetails emptyEmail"></div>}
            </div>
        </div>
    )
}