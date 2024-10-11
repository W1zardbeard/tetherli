import  { react, useState} from 'react';

export default function CopyLink(props) {

    const [copyText, setCopyText] = useState("Copy");


    return (
        <div className="copyLink" 
            onClick = {() => {
                setCopyText("Copied!");
                props.clickHandler();
                setTimeout(() => {
                    setCopyText("Copy");
                }, 1500);
            }
        }
        >
            <img src="../src/assets/icon-logo-standalone.svg"/>  
            <h2>tetherli/{props.username}</h2>
            <p>{copyText}</p>
        </div>
    )
}
