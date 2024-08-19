export default function LinkCard(props){

    switch(props.type){
        case "github":
            var linkStyle = {
                backgroundColor: '#1A1A1A'
            }
            var iconSrc = "icon-github.svg";
            var name = "GitHub";
        break;
        case "twitter":
            var linkStyle = {
                backgroundColor: '#43B7E9'
            }
            var iconSrc = "icon-twitter.svg";
            var name = "Twitter";
        break;
        case "linkedin":
            var linkStyle = {
                backgroundColor: '#2D68FF'
            }
            var iconSrc = "icon-linedin.svg";
            var name = "LinkedIn";
        break;
        case "youtube":
            var linkStyle = {
                backgroundColor: '#EE3939'
            }
            var iconSrc = "icon-youtube.svg";
            var name = "Youtube";
        break;
        case "facebook":
            var linkStyle = {
                backgroundColor: '#2442AC'
            }
            var iconSrc = "icon-facebook.svg";
            var name = "Facebook";
        break;
        case "twitch":
            var linkStyle = {
                backgroundColor: '#EE3FC8'
            }
            var iconSrc = "icon-twitch.svg";
            var name = "Twitch";
        break;
        case "instagram":
            var linkStyle = {
                backgroundColor: '#c13584'
            }
            var iconSrc = "icon-instagram.svg";
            var name = "Instagram";
        break;
        case "steam":
            var linkStyle = {
                backgroundColor: '#2a475e'
            }
            var iconSrc = "icon-steam.svg";
            var name = "Steam";
        break;
        case "freecodecamp":
            var linkStyle = {
                backgroundColor: '#302267'
            }
            var iconSrc = "icon-freecodecamp.svg";
            var name = "freeCodeCamp";
        break;
        case "gitlab":
            var linkStyle = {
                backgroundColor: '#EB4925'
            }
            var iconSrc = "icon-gitlab.svg";
            var name = "GitLab";
        break;
        case "hashnode":
            var linkStyle = {
                backgroundColor: '#0330D1'
            }
            var iconSrc = "icon-hashnode.svg";
            var name = "Hashnode";
        break;
        case "stackoverflow":
            var linkStyle = {
                backgroundColor: '#EC7100'
            }
            var iconSrc = "icon-stackoverflow.svg";
            var name = "Stack Overflow";
        break;
    }
    


    return(
        <div className="linkCard " style={linkStyle}>
            <div className="nameAndIcon">
                <img src={"src/assets/" + iconSrc} />
                <p>{name}</p>
            </div>
            <img src="src/assets/icon-arrow-right.svg"/>

        </div>
    )
}