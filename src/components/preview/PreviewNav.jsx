import CTA from "../CTA";
import { useNavigate } from 'react-router-dom';

export default function PreviewNav() {

  //init navigate  
  const navigate = useNavigate();

  //placeholder for share function
    function sharePlaceholder(){
        alert("Share Placeholder");
    }


  return (
    <div className="navbar">
      
        <CTA 
            text={"Back to Editor"}
            style={"secondary"}
            icon={false}
            clickHandler={() =>  navigate("/editor")}
        />

        <CTA
            text={"Share Link"}
            style={"primary"}
            icon={true}
            clickHandler={sharePlaceholder}
        />
    </div>
  );
}