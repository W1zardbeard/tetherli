import CTA from "../CTA";
import { useNavigate } from 'react-router-dom';
import Logo from "../Logo";


export default function ShareNav() {

  //init navigate  
  const navigate = useNavigate();


  return (
    <div className="navbar">

        <a href="/">
            <Logo 
                large={true}
                width={146}
                editor={true}
            />
            </a>
      
     

        
    </div>
  );
}