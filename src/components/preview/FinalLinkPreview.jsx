import UserProfile from "../editor/UserProfile"
import LinkListMockup from "../editor/LinkListMockup"



export default function FinalLinkPreview(props) {


    return (
        <div className="finalPreview">
                <UserProfile 
                    userDetails = {props.userDetails}
                    
                />
                <LinkListMockup 
                    links = {props.links}
                    sharePage = {true}
                
                />

               
           
        </div>
    )
}