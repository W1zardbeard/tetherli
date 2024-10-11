import {useState, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Switch from "@radix-ui/react-switch";


export default function DetailsEdit(props){

 
  
    //state variables to store the user's details
    const [fname, setFname] = useState(props.userDetails.first_name || "");
    const [lname, setLname] = useState(props.userDetails.last_name || "");
    const [email, setEmail] = useState(props.userDetails.email || "");
    const [username, setUsername] = useState(props.userDetails.username || "");

    const [showEmail, setShowEmail] = useState(false);

    //useEffect to update the state variables when the props change (first name)
    useEffect(() => {
        if (props.userDetails.first_name !== undefined) {
            setFname(props.userDetails.first_name);
        }
    }, [props.userDetails.first_name]);

    //useEffect to update the state variables when the props change (last name)
    useEffect(() => {
        if (props.userDetails.last_name !== undefined) {
            setLname(props.userDetails.last_name);
        }
    }, [props.userDetails.last_name]);

    //useEffect to update the state variables when the props change (email)
    useEffect(() => {
        if (props.userDetails.email !== undefined) {
            setEmail(props.userDetails.email);
        }
    }, [props.userDetails.email]);

    //useEffect to update the state variables when the props change (username)
    useEffect(() => {
        if (props.userDetails.username !== undefined) {
            setUsername(props.userDetails.username);
        }
    }, [props.userDetails.username]);

    //function to handle changes in the input fields
    function handleChange(event){
        const{name, value} = event.target;
        if(name === "firstName"){
            setFname(value);
            props.updateDetails(event);
        }
        else if(name === "lastName"){
            setLname(value);
            props.updateDetails(event);
        }
        else if(name === "email"){
            setEmail(value);
            props.updateDetails(event);
        }
        else if(name === "username"){  
            //disable spaces in username
            if(value.includes(" ")){
                //alert user
                toast.error("Username cannot contain spaces", {
                    autoClose: 2000,
                    position: "top-center",
                });
                return;
            }

            setUsername(value);
            props.updateDetails(event);
        }
    }	




    //Think we're gonna have to do something with use effect here as it is not updating the state of the switch
    //its basically happening one step behind sigh

    function handleSwitch(event){
       
        const isChecked = event.target.getAttribute('data-state');
        console.log(isChecked);
        if(isChecked === "unchecked"){
            setShowEmail(false);
        }
        else if(isChecked === "checked"){
            setShowEmail(true);
        }
        
    }

    function tickleTheEmail(){
       if (showEmail === false){
           setShowEmail(true);
       }
         else{
              setShowEmail(false);
         }
    }

    function logTheEmail(){
        console.log(showEmail);
    }



    

    return(
        <div className="profileEditSection editDetails">
            <div className="inputRow">
                <p>Username</p>
                <input
                    onChange={handleChange}
                    className="formField noIcon"
                    name="username" 
                    type="text" 
                    placeholder="Username"
                    value={username}
                />
            </div>
            <div className="inputRow">
                <p>First name</p>
                <input
                    onChange={handleChange}
                    className="formField noIcon"
                    name="firstName" 
                    type="text" 
                    placeholder="First Name"
                    value={fname}
                />
            </div>
            <div className="inputRow">
                <p>Last name</p>
                <input
                    onChange={handleChange}
                    className="formField noIcon"
                    name="lastName" 
                    type="text" 
                    placeholder="Last Name"
                    value={lname}
                />
            </div>
            <div className="inputRow">
                <p>Email</p>
                <input
                    onChange={handleChange}
                    className="formField noIcon"
                    name="email" 
                    type="text" 
                    placeholder="Email"
                    value={email}
                />
            </div>

            <div className="inputRow">
                <p>Show email on profile</p>
                <Switch.Root onClick={handleSwitch} className="SwitchRoot">
				    <Switch.Thumb className="SwitchThumb" />
			    </Switch.Root>
            </div>

            <button onClick={tickleTheEmail} > change email state </button>
            <button onClick={logTheEmail} > log email state </button>
            
        </div>
    )
}

        