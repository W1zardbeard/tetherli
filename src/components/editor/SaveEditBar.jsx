import CTA from "../CTA"

export default function SaveEditBar(props){
    return(
        <div className="saveEditBar">
           
            <CTA 
                disabled={props.linkLength === 0 ? true : false} 
                text={"Save"}
                style={"primary"}
                clickHandler={props.save}
            />
        </div>
    )
}