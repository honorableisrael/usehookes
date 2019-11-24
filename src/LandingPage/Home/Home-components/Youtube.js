import React from 'react';
import youtube from '../../../assets/youtube-01.svg'
import '../Home.css'

const HowToVideo =()=>{
    return(
        <div>
            <div className="first-text-item">
                {/* <iframe width="100%" height="300px"
                    src="https://www.youtube.com/embed/jwjGw3BCryI">
                </iframe> */}
                <img src={youtube} className="howitworksvideorepresentation" alt="howitworksvideorepresentation"/>
            </div>
        </div>
    )
}

export default HowToVideo