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
    const [showEmail, setShowEmail] = useState(props.userDetails.show_email || false);
    const [showName, setShowName] = useState(props.userDetails.show_name || false);

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

    //useEffect to update the state variables when the props change (show email)
    useEffect(() => {  
        //get the switch element by its id
        const switchElement = document.getElementById("showEmail"); 
        
        if (props.userDetails.show_email !== undefined) {
            setShowEmail(props.userDetails.show_email);
        }

        //setting the switch to checked or unchecked based on the value of show_email
        if(props.userDetails.show_email === true){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'checked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'checked');
            //set the state variable to true
            setShowEmail(true);
        } else if (props.userDetails.show_email === false){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'unchecked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'unchecked');  
            //set the state variable to false
            setShowEmail(false);
        }
    }, [props.userDetails.show_email]);

     //useEffect to update the state variables when the props change (show name)
     useEffect(() => {  
        //get the switch element by its id
        const switchElement = document.getElementById("showName"); 
        
        if (props.userDetails.show_name !== undefined) {
            setShowName(props.userDetails.show_name);
        }

        //setting the switch to checked or unchecked based on the value of show_name
        if(props.userDetails.show_name === true){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'checked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'checked');
            //set the state variable to true
            setShowName(true);
        } else if (props.userDetails.show_name === false){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'unchecked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'unchecked');  
            //set the state variable to false
            setShowName(false);
        }
    }, [props.userDetails.show_name]);


//=======================================================================================================


    

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

  


    //function to handle the switch for showing email
    function handleEmailSwitch(event){
        //get the switch element by its id
        const switchElement = document.getElementById("showEmail");
        //get the current state of the switch
        const isChecked = switchElement.getAttribute('data-state');
        if(isChecked === "unchecked"){
            setShowEmail(true);
        }
        else if(isChecked === "checked"){
            setShowEmail(false);
        } 
    }




    //function to handle the switch for showing name
    function handleNameSwitch(event){
        //get the switch element by its id
        const switchElement = document.getElementById("showName");
        //get the current state of the switch
        const isChecked = switchElement.getAttribute('data-state');
        if(isChecked === "unchecked"){
            setShowName(true);
            
        }
        else if(isChecked === "checked"){
            setShowName(false);
          
        } 
    }


      //useEffect to update the switch state when the showEmail state changes
      useEffect(() => {
        //get the switch element by its id
        const switchElement = document.getElementById("showEmail");
        if(showEmail === true){
        //set the switch to checked
        switchElement.setAttribute('data-state', 'checked');
        //also set the child span to checked
        switchElement.children[0].setAttribute('data-state', 'checked');
        props.updateShowEmail(showEmail);
        }
        else if(showEmail === false){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'unchecked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'unchecked');
            props.updateShowEmail(showEmail);
        }
    }, [showEmail]);


     //useEffect to update the switch state when the showName state changes
     useEffect(() => {
        //get the switch element by its id
        const switchElement = document.getElementById("showName");
        if(showName === true){
        //set the switch to checked
        switchElement.setAttribute('data-state', 'checked');
        //also set the child span to checked
        switchElement.children[0].setAttribute('data-state', 'checked');
        props.updateShowName(showName);
        }
        else if(showName === false){
            //set the switch to checked
            switchElement.setAttribute('data-state', 'unchecked');
            //also set the child span to checked
            switchElement.children[0].setAttribute('data-state', 'unchecked');
            props.updateShowName(showName);
        }
    }, [showName]);



    

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
                <p>Show name on profile</p>
                <Switch.Root 
                    name="showName"
                    onClick={handleNameSwitch} 
                    className="SwitchRoot" 
                    id="showName"
                    checked={showName}
                >
				    <Switch.Thumb className="SwitchThumb" />
			    </Switch.Root>
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
                <Switch.Root 
                    name="showEmail" 
                    onClick={handleEmailSwitch} 
                    className="SwitchRoot" 
                    id="showEmail"
                    checked={showEmail}
                >
				    <Switch.Thumb className="SwitchThumb" />
			    </Switch.Root>
            </div>
            
            
        </div>
    )
}

        