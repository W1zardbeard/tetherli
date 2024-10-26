import {React, useEffect, useState} from 'react';
import axios from 'axios';
import ShareNav from '../components/sharePage/ShareNav.jsx';
import NavCard from '../components/preview/NavCard';

export default function SharePage(){
    return(
        <div className='editor previewPage'>
            <ShareNav />
            <div className='noUserCont'>
                <img src="src/assets/user-not-found.png" className='noUserImg'/>
                    <div className='noUserText'>
                        <h2>Looks like there's nothing here...</h2>
                        <p>Why not claim your own tetherli?</p>
                    </div>
                    <NavCard />
                </div>
            </div>
    )
}