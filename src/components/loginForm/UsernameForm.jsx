import {useState, React} from 'react';
import TitleDesc from './TitleDesc';
import CTA from "../CTA";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function UsernameForm(){

    const [username, setUsername] = useState("");
    //For disabled button on and off
    const [disabledBtn, setDisabledBtn] = useState(true);

    function handleChange(event){
        const {name, value} = event.target;
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
                toast.success("Username updated successfully",{
                    autoClose: 2000,
                    position: "top-center",
                });
            })
            .catch((err) => {
                toast.error(err.response.data, {
                    autoClose: 2000,
                    position: "top-center",
                });
            })
    }

    return(
        <div className='loginForm'>
            <TitleDesc 
                title="Create account"
                subText="Let’s get you started sharing your links!"
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