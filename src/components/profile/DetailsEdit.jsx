import {useState, useEffect} from 'react';

export default function DetailsEdit(props){

   
    //set the initial values of the input fields to the user's current details 
    useEffect(()=>{
        setEmail(props.userDetails.email);
        setFname(props.userDetails.firstName);
        setLname(props.userDetails.lastName);
    },[props.userDetails]);

    //state variables to store the user's details
    const [fname, setFname] = useState(props.userDetails.firstName ? props.userDetails.firstName : "");
    const [lname, setLname] = useState(props.userDetails.lastName ? props.userDetails.lastName : "");
    const [email, setEmail] = useState(props.userDetails.email ? props.userDetails.email : "");

    //function to handle changes in the input fields
    function handleChange(event){
        const{name, value} = event.target;
        if(name === "firstName"){
            setFname(value);
        }
        else if(name === "lastName"){
            setLname(value);
        }
        else if(name === "email"){
            setEmail(value);
    }
    }	

    return(
        <div className="profileEditSection editDetails">
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

        