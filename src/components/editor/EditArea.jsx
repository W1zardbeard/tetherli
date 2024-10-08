import TitleDesc from "../loginForm/TitleDesc";
import CTA from "../CTA";
import EmptyEdit from "./EmptyEdit";
import LinkBuilder from "./LinkBuilder";
import SaveEditBar from "./SaveEditBar";

export default function EditArea(props){

 



    return(
        <div className="editArea">
            <TitleDesc 
                title="Customise your links"
                subText="Add/edit/remove links below and then share all your profiles with the world!"
            />
            <div className="formCont">
                <CTA
                    text={"Add new link"}
                    style={"secondary"}
                    icon={false}
                    fullWidth={true}
                    
                    clickHandler={props.addNewLink} 
                   
                />

                {props.links?.length > 0 ? 
                props.links.map((link, index) => (
                    <LinkBuilder 
                        key={link.link_id}
                        id={link.link_id}
                        numInList={index + 1}
                        type={link.type}
                        url={link.link}
                        setNewLink={props.setNewLink}
                        updateLink={props.updateLink}
                        removeLink={props.removeLink}
                        
                    /> 
                ))
                : 
                <EmptyEdit />}
            </div>

            <SaveEditBar 
                linkLength={props.links?.length}
                save={props.saveLinks}
            />
       
        </div>
    )
}