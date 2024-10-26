import UserProfile from "./UserProfile"
import LinkListMockup from "./LinkListMockup"
import MoonLoader from "react-spinners/MoonLoader";

export default function PhonePreview(props){
  
   
 
    return(
    <div className="phonePreviewCont">
        {props.loading ? 
        <div className="loaderContainer">
            <MoonLoader 
            color={"#633CFF"} 
            loading={props.loading} 
            size={40} 
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
        </div>:
        
      
        
            <div className="phoneMockup">
                <UserProfile 
                    userDetails = {props.userDetails}
                />
                <LinkListMockup 
                    links = {props.links}
                    sharePage = {false}
                />
            </div>
            }
        </div>
    )
}