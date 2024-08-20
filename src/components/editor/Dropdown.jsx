import React, { useState, useEffect } from 'react';
import Select from 'react-select';


const options = [
    { value: 'github', label: 'GitHub' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'youtube', label: 'Youtube' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitch', label: 'Twitch' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'steam', label: 'Steam' },
    { value: 'freecodecamp', label: 'freeCodeCamp' },
    { value: 'gitlab', label: 'GitLab' },
    { value: 'hashnode', label: 'Hashnode' },
    { value: 'stackoverflow', label: 'Stack Overflow' },
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
  
    })
  }

  




  export default function Dropdown(props){
    var indexOfType;
    useEffect(() => {
        indexOfType = options.findIndex(x => x.value === props.type);
        // console.log(indexOfType);
        // options.findIndex(defaultTypeMatcher);
      },[props.type]);

      console.log(options[indexOfType]);
    

      //Try to get this fucking default value to work

    // console.log(props?.type);
    return(
        <div>
            <label>Platform</label>
            <Select 
               defaultValue={options[indexOfType]}
                styles={styles}
                options={options} 
               
            />
        </div>
        
    )
  }