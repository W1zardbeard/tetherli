import Navbar from "../components/editor/Navbar";

export default function Editor(){
    return(
        <div className="editor">
            <Navbar 
                editor={true}
            />
            <h1>This is the editor</h1>
        </div>
        
    )
}