export default function UserProfile(props){
    return(
        <div className="userProfile">
            {props.userDetails.avatar ? <div className="userAvatar"><img src="https://xsgames.co/randomusers/assets/avatars/male/42.jpg" /></div> :  <div className="userAvatar"></div>}
            <div className="details">
                {props.userDetails.name ? <h2>{props.userDetails.name}</h2> : <div className="empty emptyDetails emptyName"></div>}
                {props.userDetails.email ? <p className="bodySmall">{props.userDetails.email}</p> :<div className=" empty emptyDetails emptyEmail"></div>}
            </div>
        </div>
    )
}