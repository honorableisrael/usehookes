import React from 'react';
import '../../Home.css';
import '../Slider/Slider.css'
import './Footer.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import img0 from '../../../../assets/pramopro4.png';
import{ Link } from 'react-router-dom';



const date=()=>{
    let today = new Date()
    return today.getFullYear()
}
const Footer = (props) => {
    return (
        <div>
            <Container fluid={true}>
                <Row className="wrapper-footer" style={{top:props.top}}>
                    <Col sm={3} md={3} xs={5} >
                        <div className="footer-logo"><img src={img0}  height="50px"/></div><div className="phone-numbers"><p>Reach Us Now</p><p className="footer-phone-numbers"><a href="tel:2349011665589" className="linkphone">090-1166-5589</a></p><div className="footer-phone-numbers"><a href="tel:2349091429212" className="linkphone">090-9142-9212</a></div></div>
                    </Col>
                    <Col sm={3} md={3} xs={3} className="footerss navigation">
                        <div><h6>Navigation</h6><p><Link to="/about" className="footer-link">About</Link></p> <p><Link to="/products" className="footer-link">Products</Link></p><p><Link to="/contact-us" className="footer-link">Contact</Link></p><p><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></p></div><div></div>
                    </Col>
                    <Col sm={3} md={3} xs={3} className="footerss footer-item">
                    <div><h6>Discover</h6><p className="footermargin"><Link className="footer-link">FAQs</Link></p><p className="mobile-privacypolicy"><Link to="/privacy-policy" className="footer-link">Privacy Policy</Link></p></div>
                    </Col>
                    <Col sm={3} md={3} xs={4} className="footerss footer-item">
                    <div><h6>Connect</h6>
                        <p className="footer-icons"> <a href="https://twitter.com/pramopro" className="footerlink" target="blank"><i className="fa fa-twitter-square"> </i></a> <a href="https://www.youtube.com/channel/UCDx9nQEaac9Nq7vujbXAbDg?view_as=subscriber" className="footerlink" target="blank"><i className="fa fa-youtube-square" ></i></a> <a href="https://www.linkedin.com/company/pramopro-ltd" className="footerlink" target="blank"><i className="fa fa-linkedin-square"></i> </a></p>
                        </div>
                    </Col>
                    <div className="btn-container">
                        <div>
                            <div className="btn-wrapper footer-bottom">Copyright © {date()} Pramopro. All rights reserved.</div></div>
                        </div>
                </Row>
            </Container>
        </div>  
    );
};

export default Footer;
