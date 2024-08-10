import UserProfile from "./UserProfile"
import LinkListMockup from "./LinkListMockup"

export default function PhonePreview(){
    return(
        <div className="phonePreviewCont">
            <div className="phoneMockup">
                <UserProfile />
                <LinkListMockup />
            </div>
        </div>
    )
}