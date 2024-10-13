export default function UserProfile(props){
    const avatarPath = props.userDetails?.avatar ? encodeURI(props.userDetails.avatar.trim()) : '';
    const style = {
        backgroundImage: `url(../server/${avatarPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }

   


    return(
        
        <div className="userProfile">
            {props.userDetails?.avatar ? <div className="userAvatar" style={style}></div> :  <div className="userAvatar"></div>}
            <div className="details">
                {props.userDetails?.username ? <h1 className="username">{props.userDetails.username}</h1> : <div className="empty emptyDetails emptyName"></div>}
                <div>
                    {props.userDetails.show_name ? 
                        props.userDetails?.email ? <p className="realName bodySmall">({props.userDetails.first_name} {props.userDetails.last_name})</p> :<div className=" empty emptyDetails emptyEmail"></div>
                    : null}
                    {props.userDetails.show_email ?
                    props.userDetails?.email ? <p className="bodySmall">{props.userDetails.email}</p> :<div className=" empty emptyDetails emptyEmail"></div>
                    : null}
                </div>
            </div>
        </div>
    )
}