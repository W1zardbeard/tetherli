import {useState, React} from 'react';
import TitleDesc from './TitleDesc';
import CTA from "../CTA";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function UsernameForm(props){

    const [username, setUsername] = useState("");
    //For disabled button on and off
    const [disabledBtn, setDisabledBtn] = useState(true);

    function handleChange(event){
        const {name, value} = event.target;

        if(value.includes(" ")){
            //alert user
            toast.error("Username cannot contain spaces", {
                autoClose: 2000,
                position: "top-center",
            });
            return;
        }
        setUsername(value);
        if(value.length > 0){
            setDisabledBtn(false);
        }else {
            setDisabledBtn(true);
        }
    }

    function handleUsername(e){
        e.preventDefault();
        const token = localStorage.getItem("token");
        const userData = {username};

            axios.post("/api/addUsername", userData, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then((res) => {
                props.setPageFlow("names");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data, {
                    autoClose: 2000,
                    position: "top-center",
                });
            })
    }


    return(
        <div className='loginForm'>
            <TitleDesc 
                title="Add username"
                subText="This is what people will use to find you"
            />
            <form name="registerForm" onSubmit={handleUsername}>
            <div>
                    <label htmlFor="username">Set username</label><br/>
                    <input
                        
                        onChange={handleChange}
                        className="formField noIcon"
                        name="username" 
                        type="text" 
                        placeholder="Enter your username" 
                        value={username}
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