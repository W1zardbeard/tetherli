import Navbar from "../components/editor/Navbar";

export default function ProfileDetails(){
    return(
        <div className="editor">
            <Navbar 
                profile={true}
            />
            <h1>This is the profile details</h1>
        </div>
        
    )
}