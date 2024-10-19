import EmptyLink from "./EmptyLink";
import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";

export default function LinkListMockup(props){

   const linkList = props.links;
   var totalLinks = 5 ;


    
  return(
   <div className="linkList">
    {props.links?.length > 0 ? 
      // If there are links, map through the linkList and render a LinkCard for each link
      linkList?.map((link, index) => (
       <LinkCard
        key={link.link_id}
        type={link.type}
        link={link.link}
       />
      ))
    :
      // If there are no links and it's the share page, show a message
      props.sharePage ?
       <h2 className="sharePageEmptyText">This user hasn't added any links yet</h2>
      :
       // If there are no links and it's not the share page, render a list of EmptyLink components
       Array.from({length: totalLinks}, (_, index) => (
        <EmptyLink key={`empty-${index}`} />
       ))
    }
   </div>  
  )

}