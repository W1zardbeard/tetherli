import axios from 'axios';

export default function AvatarUpload(props){
    

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
        <input type="file"  accept="image/*" onChange={handleFileChange}/>
    );
}
    
