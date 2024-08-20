import React, { useState } from 'react';
import Dropdown from "./Dropdown";

export default function LinkBuilder(props){
    return(
        <div className="linkBuilder">
            <div className="linkHeader">
                <div className="linkTitle">
                    <img src="src/assets/icon-drag-and-drop.svg"/>
                    <p>Link #{props.numInList}</p>
                </div>
                <p className="remove">Remove</p>
            </div>


            <Dropdown 
                type={props.type}
            />
            
        


        
           
            <h1>{props.type}</h1>
            <h2>{props.url}</h2>
        </div>
    )
}