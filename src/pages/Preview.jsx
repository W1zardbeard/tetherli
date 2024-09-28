import React from 'react';
import SaveEditBar from '../components/editor/SaveEditBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PreviewNav from '../components/preview/PreviewNav';
import FinalLinkPreview from '../components/preview/FinalLinkPreview';



export default function Preview() {
    

    //get username from url
    const url = window.location.href;
    const username = url.split("/").pop();
    console.log(username);

  return (
    <div className='editor'>
        <PreviewNav />
        <FinalLinkPreview />
    </div>
  );
}