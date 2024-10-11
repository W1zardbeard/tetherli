import CTA from "../CTA";
import { useNavigate } from 'react-router-dom';

export default function PreviewNav() {

  //init navigate  
  const navigate = useNavigate();


  return (
    <div className="navbar">
      
        <CTA 
            text={"Back to Editor"}
            style={"secondary"}
            icon={false}
            clickHandler={() =>  navigate("/editor")}
        />

        
    </div>
  );
}