import CTA from "../CTA"

export default function SaveEditBar(props){
    return(
        <div className="saveEditBar">
           
            <CTA 
                text={"Save"}
                style={"primary"}
                clickHandler={props.save}
            />
        </div>
    )
}