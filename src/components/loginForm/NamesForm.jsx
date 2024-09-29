import {useState, React, useEffect} from 'react';
import TitleDesc from './TitleDesc';
import CTA from "../CTA";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default function NamesForm(props){

    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const [disabledBtn, setDisabledBtn] = useState(true);


    //function to handle changes in the input fields
    function handleChange(event){
        const{name, value} = event.target;
        if(name === "firstName"){
            setFname(value);
            
        }
        else if(name === "lastName"){
            setLname(value);
        }
    }

    //handle the disabled button state
    useEffect(() => {
        if(fname.length > 0 && lname.length > 0){
            setDisabledBtn(false);
        }else {
            setDisabledBtn(true);
        }
    }, [fname, lname]);

    //function to handle the form submission
    function handleNames(e){
        e.preventDefault();
        const token = localStorage.getItem("token");
        const userData = {first_name: fname, last_name: lname};
            
                axios.post("/api/addNames", userData, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then((res) => {
                    props.setPageFlow("username");
                })
                .catch((err) => {
                    console.log(err);
                    toast.error(err.response.data, {
                        autoClose: 2000,
                        position: "top-center",
                    });
                });
     }

   







    return(
        <div className='loginForm'>
            <TitleDesc 
                title="Add your name"
                subText="This is the name that will be displayed on your profile"
            />

            <form name="registerForm" onSubmit={handleNames}>
                <div>
                        <label htmlFor="firstName">First name</label><br/>
                        <input
                            
                            onChange={handleChange}
                            className="formField noIcon"
                            name="firstName" 
                            type="text" 
                            placeholder="Enter your first name" 
                            value={fname}
                        />
                </div>

                <div>
                        <label htmlFor="lastName">Last name</label><br/>
                        <input
                            
                            onChange={handleChange}
                            className="formField noIcon"
                            name="lastName" 
                            type="text" 
                            placeholder="Enter your last name" 
                            value={lname}
                        />
                </div>
                <CTA
                type={"submit"}
                style={"primary"}
                text={"Next"}
                disabled={disabledBtn}
            />
            </form>
        </div>
    )
}