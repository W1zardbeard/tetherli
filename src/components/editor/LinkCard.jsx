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
            var iconSrc = "icon-linkedin.svg";
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
                backgroundColor: '#6441a5'
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
            var iconSrc = "icon-stack-overflow.svg";
            var name = "Stack Overflow";
        break;
        case "custom":
            var linkStyle = {
                backgroundColor: '#633CFF',
               
                backgroundColor: "-webkit-linear-gradient(to left, #633CFF, #ff00cc)",  /* Chrome 10-25, Safari 5.1-6 */
                background: "linear-gradient(to right, #633CFF, #ff00cc)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                
            }
            var iconSrc = "icon-custom.svg";
            var name = "Custom";
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