import React from 'react';
import '../Home.css'
import androidsvg from '../../../assets/google-play-store.svg'
import applesvg from '../../../assets/app-store.svg'


const OurMobileAppsSection =()=>{
    return(
        <div>
            <div className="how-it-works">Start Trading Today</div>
            <div className="mobileapptext">
            <span className="textunderline"><span className="greentext"> Get </span> the</span> app   
            </div>
            <div className="applinkpicture"><a href="https://play.google.com/store/apps/details?id=com.pramopro.app" className="playstorelink" target="blank"><img  src={androidsvg} alt="androidsvg"/></a> <img src={applesvg} className="appstore" alt="app-store"/></div>
        </div>
    )
}

export default OurMobileAppsSection;