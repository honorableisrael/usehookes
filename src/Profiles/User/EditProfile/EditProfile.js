import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './EditProfile.css'
import Navbar from '../../../LandingPage/Home/Home-components/Navbar/nav-bar';
import Footer  from '../../../LandingPage/Home/Home-components/Footer/Footer';
import Row from 'react-bootstrap/Row';
import img1 from '../../../assets/avatar.svg';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
//user
import '../../../LandingPage/Home/Home-components/Slider/Slider.css'
import PersonalDetails from './PersonalDetails';
import NextOfKin from './NextOfKin';
import BankDetails from './BankDetails';
import ResetPassword from './ResetPassword';
import editicon from '../../../assets/edit.svg';
//edit profile photo
import MyVerticallyCenteredModal from '../EditProfile/imageUpLoad'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import API from '../../../assets/config.js';
import axios from 'axios';


class EditProfile extends Component {
    state={
        focus:true,
        focus1:false,
        firstname:'',
        token:'',
        lastname:'',
        email:'',
        male:false,
        female:false,
        success:false,
        modalShow:false,
        isloading:false,
        user:{},
        isverified:false,
        message:'',
        subject:'',
        show:false,
        errorMessage:'',
        socialImage:''
    }

    sendMessageToCrm=()=>{
        this.setState({isloading:true})
        const {subject , message} = this.state
        const data = {
            subject,
            message
        }
        axios.post(`${API}/api/v1/contact/crm`,data, { headers: { 'Authorization': `Bearer ${this.state.token}` } })
        .then(res=>{
            console.log(res)
            if(res.data.responseStatus==200){
                this.setState({
                    isloading:false,
                    success:'Message Sent',
                  })
                setInterval(()=>this.setState({show:false}),2000)
            }
            if(res.data.responseStatus==400){
                this.setState({
                    isloading:false,
                    errorMessage:'Message Sending Failed',
                 })
                 setInterval(()=>this.setState({show:false}),2000)
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }

    onchange=(e)=>{
        this.setState({
         [e.target.id] : e.target.value
        })
     }

     componentDidMount() {
        window.scrollTo(-0,-0)
        const userPhoto = sessionStorage.getItem('userprofilephoto')
        const loggedIn = sessionStorage.getItem('adminDetails');
        console.log(userPhoto)
        const imgUrl = loggedIn?JSON.parse(userPhoto):''
        this.setState({
            socialImage:imgUrl
        })
        const userdata = loggedIn?JSON.parse(loggedIn):''
        if(!userdata){
            return this.props.history.push('/login')
         }
        const token = loggedIn?JSON.parse(loggedIn).token:''
        this.setState({
            token:token
        })
          axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(res=>{
              console.log(res)
           this.setState({
              user:res.data.user,
              isverified:res.data.user.verified
           })  
          })
          .catch(err=>{
              console.log(err)
          })
      };
    render() {
        const green = 'rgb(67,160,71)';
        const{user,modalShow,socialImage,isverified,isloading,show,message,errorMessage,success,subject}=this.state;
        const handleClose = () => this.setState({show:false});
        const handleShow = () => this.setState({show:true});
        
       console.log('user' + user)
       if(isverified){
       return (
            <div>
                <Navbar top="3.3rem" top1="-3.3rem" user={user}/>
                <Container className="page-wrapper-user" fluid={true}>
                    <Row className="userfirstcontent">
                    <ButtonToolbar>
                        <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => this.setState({modalShow:false})}
                        />
                        </ButtonToolbar>
                            <Col md={{span:10,offset:1}}  className="userfirstitems-welcome">
                                <div  className="user-info-wrapper">
                                    <img onClick={() => this.setState({modalShow:true})} className="user-profile-photo user-profile-photo-edit" src={user.profileImage?user.profileImage:(socialImage?socialImage:img1)} alt="userImage" /><img className="editicon" onClick={() => this.setState({modalShow:true})}  src={editicon} alt="editicon" />
                                        <div className="user-welcome-text shiftleft">
                                            <h4 className="username">
                                                Welcome  {user.firstname?user.firstname:''} {user.lastname?user.lastname:(user.fullname?user.fullname:'')}
                                                </h4>
                                                <h6> <i className="fa fa-calendar"></i>Trading Since {user.dateRegistered}
                                            </h6>
                                        </div>    
                                    </div>
                                <hr/>
                            <Col md={{span:12}}  className="userseconditems">
                                <div className="usersecondcontent"><div className="user-item user-item1" onClick={handleShow}><i className="fa fa-address-book"></i>Contact Account Officer</div><div><Link className="user-btn" to="/user-dashboard">Dashboard</Link></div></div>
                            </Col>
                         </Col>
                    </Row>
                    
                    <Row className="userfirstcontent-update">

                        <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Account Officer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>    
                        {/* <Form noValidate  onSubmit={this.SignUp} >
                                <Form.Group >
                                    <Form.Control type="text" onChange={this.onchange} required value={subject} id="subject" placeholder="Phone number" />
                                </Form.Group>
                        </Form>
                        <Form noValidate  onSubmit={this.SignUp} >
                                <Form.Group >
                                    <Form.Control type="text" onChange={this.onchange} required value={subject} id="subject" placeholder="Phone number" />
                                </Form.Group>
                        </Form> */}
                         <Form noValidate  onSubmit={this.SignUp} >
                             <p className="text-success messagetocrm"> {success}</p>
                             <p className="text-danger messagetocrm"> {errorMessage}</p>
                            <Form.Group >
                                <Form.Control type="text" onChange={this.onchange}  onChange={this.onchange} required value={subject} id="subject" placeholder="Subject" />
                            </Form.Group>
                        </Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" placeholder="Message" onChange={this.onchange} id="message" value={message} rows="5"/>
                        </Form.Group>
                        <Button className="sub-btn" variant="success" onChange={this.onchange} size='lg' onClick={this.sendMessageToCrm} block>{isloading?'Submitting...':'Submit'}</Button> <i className='fa fa-paper-plane-o field-icon-send' aria-hidden="true"></i>
                        </Modal.Body>
                        </Modal>

                    <Col md={{span:10,offset:1}}  className="userfirstitems-update">
                        <h6 className="update-profie-title">Update Profile</h6>
                        <p className="update-profie-text">Update your name,contact details,etc.</p>
                    </Col>
                    </Row>
                    <Row className="userfirstcontent">
                        <Col md={{span:10,offset:1}}  className="userfirstitems-tabs ">  
                        <Tabs defaultActiveKey="PersonalDetails"  id="uncontrolled-tab-example">
                            <Tab eventKey="PersonalDetails" title="Personal Details" >
                                <PersonalDetails/>
                            </Tab>
                            <Tab eventKey="nxtofkin" title="Next-Of-Kin Details">
                               <NextOfKin />
                            </Tab>
                            <Tab eventKey="bankdetails" title="Bank Details">
                                <BankDetails/>
                            </Tab>
                            <Tab eventKey="ResetPassword" title="Password">
                                <ResetPassword/>
                            </Tab>
                        </Tabs>
                        </Col>
                     </Row>
                    
                </Container>
                <Footer />
            </div>
        );
     }//isverified block ends 
     else{
        return(<div className="isverified">
            <Spinner variant="success" animation="border" role="status">
            </Spinner>
            <div className="loadingspinnerdashboard">
                Loading...
            </div>
        </div>
        )
    }
    }
}

export default EditProfile;