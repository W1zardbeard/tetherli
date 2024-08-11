import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";

export default function LinkListMockup(props){

    const [linkList, setLinkList] = useState([props.links]);

    // useEffect(() =>{
    //     setLinkList(props.links);
    // }, [])
    // console.log(props.links);
    console.log(linkList);
    return(



    //   linkList.map(function(link){
    //         <LinkCard />
    //   })
        
      
    <LinkCard />
        
    )
}