import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
// import './EditProfile.css'
import Button from 'react-bootstrap/Button';
import API from '../../../assets/config';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import img1 from '../../assets/contactus.svg';



class ContactCRM extends Component{
    state={
        selectedFile: null,
        userid:'',
        message:'',
        subject:'',
        isloading:false
    }
    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            errorMessage:''
          })
    }
    componentDidMount() {
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        console.log(userdata)
        axios.get(`${API}/api/v1/contact`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
         this.setState({
            userid:res.data.user.id
         })  
        })
        .catch(err=>{
            console.log(err)
        })
    }

    callToast=()=> {
      // Get the snackbar DIV
      // Add the "show" class to DIV
      var x = document.getElementById("snackbar");

      x.className = "show";
    
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }

    onClickHandler = () => {
      this.setState({
        isloading:true
      })
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userinfo = JSON.parse(loggedIn)
        console.log(`user id is` +this.state.userid)
        const token = loggedIn?JSON.parse(loggedIn).token:''
        const data = new FormData()
        data.append('image', this.state.selectedFile)
        
        axios.post(`${API}/api/v1/user/${this.state.userid}/profile-picture`, data,{ headers: { 'Authorization': `Bearer ${token}` } })
        .then(res => { 
        console.log(res)
        if(res.data.responseStatus) {
            this.setState({
                success:true,
                isloading:false,
                success:res.data.responseMessage
            })
         window.location.reload()
        }
      })
      .catch(err=>{
          console.log(err)
          this.setState({
            success:false,
            isloading:false,
            errorMessage:err.response?err.response.data.msg:'No Internet Connection',
        })
      })
    } 

      
     
    
    render(){
      const{isloading,subject,message}=this.state
    return (
      <Modal
        {...this.props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="modalheaderprofilephoto" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          <i className="fa fa-cloud-upload" aria-hidden="true"></i>  Upload Profile Photo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
                <Row>
                    {/* <Col md={{span:5,offset:1}} className="contact-form-wrapper">
                            <h5 className="contact-formheader">Contact/Enquiry Form</h5>
                             
                                <Form noValidate  onSubmit={this.SignUp} >
                                        <Form.Group >
                                            <Form.Control type="text" onChange={this.onchange} required value={subject} id="subject" placeholder="Phone number" />
                                        </Form.Group>
                                </Form>
                                <Form noValidate  onSubmit={this.SignUp} >
                                        <Form.Group >
                                            <Form.Control type="text" onChange={this.onchange} required value={subject} id="subject" placeholder="Phone number" />
                                        </Form.Group>
                                </Form>
                                <Form noValidate  onSubmit={this.SignUp} >
                                        <Form.Group >
                                            <Form.Control type="text" onChange={this.onchange} required value={message} id="message" placeholder="How can we help you?" />
                                        </Form.Group>
                                </Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" placeholder="Message" rows="5"/>
                                </Form.Group>
                                <Button className="sub-btn" variant="success" size='lg' onClick={this.SignUp} block>{isloading?'Submitting...':'Submit'}</Button> <i className='fa fa-paper-plane-o field-icon-send' aria-hidden="true"></i>
                            </Col> */}
                    </Row>
        </Modal.Body>
      </Modal>
    );
    }
  }

  export default ContactCRM;