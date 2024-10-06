import React from 'react';
import TitleDesc from './TitleDesc';
import "animate.css";
import { useNavigate } from 'react-router-dom';
import CTA from '../CTA';

export default function Finished(props){

    const navigate = useNavigate();


    function handleFinish(){
        navigate("/admin");
    }

    return(
        <div className='animate__animated animate__fadeIn loginForm'>
            <TitleDesc 
                title="Your account has been created!"
                subText="Get started and share your links with the world!"
            />

            <CTA
                type={"submit"}
                style={"primary"}
                text={"Let's go!"}
                clickHandler={handleFinish}
              
            />
            
        </div>
    )
}   