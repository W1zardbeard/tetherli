import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const options = [
    { value: 'github', label: (
      <div className='typeName'>
        <img src="src/assets/icon-github.svg"/>
          GitHub
        </div>
       )
    },
    { value: 'twitter', label: (
      <div className='typeName'>
        <img src="src/assets/icon-twitter.svg"/>
          Twitter
        </div>
       ) },
    { value: 'linkedin', label: (
      <div className='typeName'>
        <img src="src/assets/icon-linkedin.svg"/>
          LinkedIn
        </div>
       ) },
    { value: 'youtube', label: (
      <div className='typeName'>
        <img src="src/assets/icon-youtube.svg"/>
          YouTube
        </div>
       ) },
    { value: 'facebook', label: (
      <div className='typeName'>
        <img src="src/assets/icon-facebook.svg"/>
          Facebook
        </div>
       ) },
    { value: 'twitch', label: (
      <div className='typeName'>
        <img src="src/assets/icon-twitch.svg"/>
          Twitch
        </div>
       ) },
    { value: 'instagram', label: (
      <div className='typeName'>
        <img src="src/assets/icon-instagram.svg"/>
          Instagram
        </div>
       ) },
    { value: 'steam', label: (
      <div className='typeName'>
        <img src="src/assets/icon-steam.svg"/>
          Steam
        </div>
       ) },
    { value: 'freecodecamp', label: (
      <div className='typeName'>
        <img src="src/assets/icon-freecodecamp.svg"/>
          FreeCodeCamp
        </div>
       ) },
    { value: 'gitlab', label: (
      <div className='typeName'>
        <img src="src/assets/icon-gitlab.svg"/>
          GitLab
        </div>
       ) },
    { value: 'hashnode', label: (
      <div className='typeName'>
        <img src="src/assets/icon-hashnode.svg"/>
          Hashnode
        </div>
       ) },
    { value: 'stackoverflow', label: (
      <div className='typeName'>
        <img src="src/assets/icon-stack-overflow.svg"/>
          Stack Overflow
        </div>
       ) },
  ]


  const styles= {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? '#633CFF' : '#D9D9D9',
      borderRadius: "8px",
      paddingTop: "12px",
      paddingBottom: "12px",
      paddingLeft: "16px",
      paddingRight: "16px",
      margin: "0px",
      
    }),
    container:(baseStyles, state) => ({
        ...baseStyles,
        fontFamily:"Instrument Sans",
        borderRadius: "32px",
        padding: "0px",
        margin: "0px",
    }),
    dropdownIndicator:(baseStyles, state) => ({
        ...baseStyles,
        paddingTop: "0px",
        paddingBottom: "0px",
        margin: "0px",
    }),
    input:(baseStyles, state) => ({
        ...baseStyles,
        padding: "0px",
        margin: "0px",
      
    }),
    valueContainer:(baseStyles, state) => ({
      ...baseStyles,
      padding: "0px",
      margin: "0px"
    }),
    option:(baseStyles, state) => ({
      ...baseStyles,
     
      color: state.isSelected ? '#633CFF' : '#333333',
      fontWeight: state.isSelected ? "800" : "400",
      backgroundColor: state.isFocused ? "#F0ECFF" : "#FFFFFF",
      cursor: "pointer",
      //filter: state.isSelected ? "invert(46%) sepia(23%) saturate(0%) hue-rotate(264deg) brightness(93%) contrast(89%)" : "filter: invert(29%) sepia(91%) saturate(5318%) hue-rotate(248deg) brightness(99%) contrast(102%)",
      
    }),
    // img:(baseStyles, state) => ({
    //   filter: state.isSelected ? "invert(46%) sepia(23%) saturate(0%) hue-rotate(264deg) brightness(93%) contrast(89%)" : "filter: invert(29%) sepia(91%) saturate(5318%) hue-rotate(248deg) brightness(99%) contrast(102%)",
    // })

  }







  export default function Dropdown(props){
    


    const [value, setValue] = useState(options[0]);
 


    function handleChange(event){
      const newValue = event.value;
      var indexOfSelected = options.findIndex(x => x.value === newValue);
      setValue(indexOfSelected); 
      
      
     
      props.setNewLink(newValue, props.indexOfThis);
    }
  
  

    function findDefaultOption(passedType){ 
        var indexOfType = options.findIndex(x => x.value === passedType);
        return indexOfType;
    }

    var defaultOption = findDefaultOption(props.type);

    useEffect(() => {
      defaultOption = findDefaultOption(props.type)
    },[props.type]);

      
   

  
    return(
        <div>
            <label>Platform</label>
            <Select 
                defaultValue={value}
                styles={styles}
                options={options} 
                onChange={handleChange}
                value={options[value]}
            />
        </div>
        
    )
  }