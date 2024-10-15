import  { react, useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function NavCard(props) {

    //copy text
    const [copyText, setCopyText] = useState("Copy");

    //init navigate
    const navigate = useNavigate();

    
    return (
        props.copyLink ?
        <div className="navCard" 
            onClick = {() => {
                setCopyText("Copied!");
                props.clickHandler();
                setTimeout(() => {
                    setCopyText("Copy");
                }, 1500);
            }
        }
        >
            <img src="../src/assets/icon-logo-standalone.svg"/>  
            <h2>tetherli/{props.username}</h2>
            <p>{copyText}</p>
        </div>
        :
        <div className="navCard reducedGapNavCard" 
            onClick = {() => {
                 navigate("/createAccount");
            }
        }
        >
            <img src="../src/assets/icon-logo-standalone.svg"/>  
            <h2>Create your own tetherli</h2>
          
        </div>
    )
    
   
}
