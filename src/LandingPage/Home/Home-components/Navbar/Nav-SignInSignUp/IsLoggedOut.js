import React from 'react';
import '../nav-bar.css'
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button'

const IsloggedOut = () => {
    return (
        <div className="nav-section3">
            <div className="btn-wrapper"><Link to="/login" className="link-text nav-btn">Sign In</Link></div>
            <div className="btn-wrapper"><Link to="/register" className="link-text nav-btn1">Register</Link></div>
        </div>
    );
}

export default IsloggedOut;
