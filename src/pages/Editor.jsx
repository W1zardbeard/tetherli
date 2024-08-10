import Navbar from "../components/editor/Navbar";
import PhonePreview from "../components/editor/PhonePreview";
import EditArea from "../components/editor/EditArea";

export default function Editor(){
    return(
        <div className="editor">
            <Navbar 
                editor={true}
            />
            <div className="mainAreaWrapper">
                <PhonePreview />
                <EditArea />
            </div>
        </div>
        
    )
}