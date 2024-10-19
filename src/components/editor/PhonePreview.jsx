import UserProfile from "./UserProfile"
import LinkListMockup from "./LinkListMockup"

export default function PhonePreview(props){
  
 
    return(
      
        <div className="phonePreviewCont">
            <div className="phoneMockup">
                <UserProfile 
                    userDetails = {props.userDetails}
                />
                <LinkListMockup 
                    links = {props.links}
                    sharePage = {false}
                />
            </div>
        </div>
    )
}