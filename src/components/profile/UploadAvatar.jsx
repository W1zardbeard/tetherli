import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UploadAvatar(props){

    const avatarPath = props.avatar ? encodeURIComponent(props.avatar.trim()) : '';
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

        if (extFile != "jpg" && extFile != "jpeg" && extFile != "png" && extFile != "gif") {
            toast.error("Only jpg, jpeg, png and gif files are allowed!", {
                autoClose: 2000,
                position: "top-center",
            });
            return;
        }

        if(e.target.files[0].size > 1048576){
            toast.error("File is too big! Max file size is 1MB", {
                autoClose: 2000,
                position: "top-center",
            });
            
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
            
            toast.success(res.data, {
                autoClose: 2000,
                position: "top-center",
            });
            //update the key to re-render the component
           props.updateAvatar();
            
            
        })
        .catch((err) => {
            toast.error(err.response.data, {
                autoClose: 2000,
                position: "top-center",
            });
        });
        }
         
    }


    
        return (
            props.uploaded ? 
            <div className='avatarCont'>
            <div className='uploadAvatar uploadedAvatar'>
                <label htmlFor="file" style={style}>
                    <span>
                        <img src="src/assets/icon-upload-image.svg" alt="upload" />
                        Upload new image
                    </span>
                </label>
                <input  type="file" id="file" className='file'  accept="image/*" onChange={handleFileChange}/>
            </div>
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

    
