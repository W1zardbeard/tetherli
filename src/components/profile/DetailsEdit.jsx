import {useState, useEffect} from 'react';

export default function DetailsEdit(props){

 
  
    //state variables to store the user's details
    const [fname, setFname] = useState(props.userDetails.first_name || "");
    const [lname, setLname] = useState(props.userDetails.last_name || "");
    const [email, setEmail] = useState(props.userDetails.email || "");
    const [username, setUsername] = useState(props.userDetails.username || "");

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
            setUsername(value);
            props.updateDetails(event);
        }
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

            
            
        </div>
    )
}

        