import EmptyLink from "./EmptyLink";
import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";

export default function LinkListMockup(props){

   const linkList = props.links;
   var totalLinks = 5 ;

    
    return(
      <div className="linkList">
        {linkList?.map((link, index) => (
          <LinkCard
            key={link.link_id}
            type={link.type}
            link={link.link}
          />
        ))}

        {props.links?.length > 0 ? 
          null
        :
          Array.from({length: totalLinks}, (_, index) => (
            <EmptyLink key={`empty-${index}`} />
          ))
        }
      </div>  
    )
}