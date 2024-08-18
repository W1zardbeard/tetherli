import TitleDesc from "../loginForm/TitleDesc";
import CTA from "../CTA";

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
                />
                {props.links?.length > 0 ? <p>links are over 0</p> : <p>links are 0</p>}
            </div>
       
        </div>
    )
}