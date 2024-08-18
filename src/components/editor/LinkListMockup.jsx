import EmptyLink from "./EmptyLink";
import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";

export default function LinkListMockup(props){

   const linkList = props.links;
   var totalLinks = 5 - linkList?.length;


   //===============================//
   //****************************** */
   // NOT SURE IF WE NEED THE BELOW //
   //===============================//
   //****************************** */

    // const [linkList, setLinkList] = useState();
    // useEffect(() =>{
    //     setLinkList(props.links);
    // }, [props.links]); 

   
    
    return(

    <div className="linkList">
      {linkList?.map((link, index) => (
            <LinkCard
                key={index}
                type={link.type}
                link={link.link}
            />
      ))}
       
       {Array.from({length: totalLinks}, () => <EmptyLink />)}
     
     
    </div>  
      
  
        
    )
}