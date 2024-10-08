import React, { useState } from 'react';
import Dropdown from "./Dropdown";

export default function LinkBuilder(props){

    const [link , setLink] = useState(props.url ? props.url : "")

    function handleChange(event){
        const{name, value} = event.target;
        setLink(value);
        props.updateLink(value, props.id);
    }


    

    return(
        <div className="linkBuilder">
            <div className="linkHeader">
                <div className="linkTitle">
                   
                    <p>Link #{props.numInList}</p>
                </div>



                <p 
                className="remove"
                onClick={() => props.removeLink(props.id)}
                >
                    Remove
                </p>

                
            </div>


            <Dropdown 
                type={props.type}
                setNewLink={props.setNewLink}
                id={props.id}
            />

            <div>
                <label htmlFor="email">Link</label><br/>
                    <input
                        onChange={handleChange}
                        className="formField"
                        style={{backgroundImage: "url('src/assets/icon-link.svg')", backgroundRepeat: "no-repeat", backgroundPosition: "10px 16px" }}
                        name="link" 
                        type="text" 
                        placeholder="e.g. https://www.github.com/johnappleseed"
                        value={link}
                    />
            </div>
            
            
        


        
           
        </div>
    )
}