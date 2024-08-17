import EmptyLink from "./EmptyLink";
import LinkCard from "./LinkCard";
import { useState, useEffect } from "react";

export default function LinkListMockup(props){

   
    //const [totalLinks, setTotalLinks]  = useState(5);
    const [linkList, setLinkList] = useState();
 

   
    useEffect(() =>{
        setLinkList(props.links);
    }, [props.links]); 

    var totalLinks = 5 - linkList?.length;

    // useEffect(() =>{
    //     var newLength = totalLinks - linkList?.length;
    //     console.log(newLength);
    //     setTotalLinks(newLength);
    // },[]);


    // useEffect(()=> {
    //     Array.from({length: totalLinks}, () => <EmptyLink />)
    // }, [linkList]);
   


    
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