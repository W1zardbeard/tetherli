import axios from 'axios';
import { useState } from 'react';

export default function UploadAvatar(props){

    const avatarPath = props.avatar ? encodeURI(props.avatar.trim()) : '';
    const style = {
        backgroundImage: `url(server/${avatarPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    

    const handleFileChange = (e) => {
        //create a form data object
        const formData = new FormData();
        //get the token from local storage
        const token = localStorage.getItem("token");
      
        //get the file name
        var fileName = e.target.files[0].name;
        //get the file extension
        var idxDot = fileName.lastIndexOf(".") + 1;
        //get the file extension and convert it to lowercase
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();


        if(e.target.files[0].size > 1048576){
            alert("File is too big! Max file size is 1MB");
            return;
        }
        //check if the file is an image
        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
        //append the file to the form data object
        formData.append('file', e.target.files[0]);
        //send the file to the server
        axios.post("/api/uploadAvatar", formData, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then((res) => {
            console.log(res);
            //update the key to re-render the component
           props.updateAvatar();
            
            
        })
        .catch((err) => {
            console.error("Error uploading avatar", err);
        });
        }else {
            //if the file is not an image, alert the user
            alert("Only jpg, jpeg, png and gif files are allowed!");
        };
    }


    
        return (
            props.uploaded ? 
            <div className='uploadAvatar uploadedAvatar'>
                <label htmlFor="file" style={style}>
                    <span>
                        <img src="src/assets/icon-upload-image.svg" alt="upload" />
                        Upload new image
                    </span>
                </label>
                <input  type="file" id="file" className='file'  accept="image/*" onChange={handleFileChange}/>
            </div>
            : 
            <div className='uploadAvatar'>
                <label htmlFor="file">
                    <img src="src/assets/icon-upload-image.svg" alt="upload" />
                    Upload image
                </label>
                <input  type="file" id="file" className='file'  accept="image/*" onChange={handleFileChange}/>
            </div>
        
    );

}

    
