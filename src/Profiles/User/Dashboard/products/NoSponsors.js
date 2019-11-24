import React from 'react';
import img1 from '../../../../assets/zerosponsor.png';
import {Link} from 'react-router-dom';
import './sponsor.css';


const NoSponsor =(props)=>{
    return(
            <div className="nosponsor" style={{left:props.leftatsmalldevice?'2rem':'inherit'}}>
                <img src={img1} className="nosponsor-rea" alt="nosponsor" />
                <p>{props.title}</p>
                <div className="btn-container">
                            {props.btn && <div>
                                <div className="btn-wrapper">
                                    <Link className="product-btn-dashboard" to="/products">View Products</Link>
                                </div>
                            </div>
                        }
              </div>          
            </div>
            )
}

export default NoSponsor;