import React, { useEffect, useState, useRef } from 'react';
import Dropdown from "./Dropdown";

export default function LinkBuilder(props){

    const [link , setLink] = useState(props.url ? props.url : "")
    const isInitialRender = useRef(true);

    function handleChange(event){
        const{name, value} = event.target;
        setLink(value);
        props.updateLink(value, props.id);
    }

    useEffect(() => {

        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        const typingTimer = setTimeout(() => {
            console.log("checking link");
            if((link.startsWith("http://") || link.startsWith("https://"))){
                console.log("good to go");
                return;
            }else if (link.startsWith("www.")) {
                console.log("starts with www.");
                setLink('https://' + link);
                props.updateLink('https://' + link, props.id);
            }else if(!link.startsWith("http://") || !link.startsWith("https://") || !link.startsWith("www.")){
                console.log("doesnt start with http, https, or www.");
                setLink("https://www." + link);
                props.updateLink("https://www." + link, props.id);
            } else if(link === ""){
                console.log("empty string");
                setLink("");
                props.updateLink("", props.id);
            }
        }, 2000);

        return () => clearTimeout(typingTimer);
    }, [link]);



    

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