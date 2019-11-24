import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './EditProfile.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
//IMPORT  ENDPOINT ADDRESS
import API from '../../../assets/config';
import axios from 'axios';
//user
import Form from 'react-bootstrap/Form'
import '../../../LandingPage/Home/Home-components/Slider/Slider.css'
//toast
import Toast from 'react-bootstrap/Toast'


class ResetPassword extends Component {
    state={
        confirmPassword:'',
        email:'',
        password:'',
        isloading:false,
        faial:false,
        errorMessage:'',
        error:false,
        show:false,
    }
    onchange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value,
            errorMessage:'',
            isloading:false
        })
    }
   
    componentDidMount() {
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        const token = loggedIn?JSON.parse(loggedIn).token:''
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)   
        })
        .catch(err=>{
            console.log(err)
        })
      };

      closeToast=()=>{
        this.setState({show:false})
     } 
      

      //check password validity
      validate =(fail)=>{
        this.setState({isloading:true})
        fail=this.state.fail
        const {confirmPassword,password} = this.state;
         //check passwords
        if( password.trim()=== '' && confirmPassword.trim() === ''){
          console.log('error feilds empty')
           return this.setState({
              fail:true,
              errorMessage:"please fill the empty feild(s)",
              isloading:false
            })
          }
      //check email and password
        if( confirmPassword !== password){
          console.log('error feilds not match')
          return  this.setState({
              fail:true,
              errorMessage:"password must be the same",
              isloading:false
            })
          }  
          // if( confirmPassword.trim()=='' && password.trim()!==''){
          //  return this.setState({
          //     isloading:false,
          //     fail:false
          //    })
          // }
          if( confirmPassword.trim() === password.trim() && confirmPassword.trim()!=='' && password.trim()!==''){
             this.setState({
               isloading:true,
               fail:false
              })
              this.updatePassword()
            }  
       }

      updatePassword=()=>{
        console.log('we are here')
        this.setState({
          isloading:true
      })
        const {password,email,confirmPassword}=this.state;
        const user = sessionStorage.getItem('adminDetails')
        const user_id = JSON.parse(user)
        const id = user_id.user.id;
        var token = user_id.token;

        const data = {
            password,
            confirmPassword
        }
        axios.post(`${API}/api/v1/user/${id}/password/update`,data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            window.scrollTo(-0,-0)
            console.log(res)
            this.setState({
                isloading:false,
                show:true
            })
        },
            setInterval(
                this.closeToast,
            4000
        ))
        .catch(err=>{
            this.setState({
                isloading:false,
                errorMessage:true,
                error:true
            })
            window.scrollTo(-0,-0)
          }, setInterval(
            this.closeError,
        3000
    ))
      }
 
      
    closeError = () =>{
        this.setState({
            error:false
        })         
    }
    render() { 
        const{password,email,confirmPassword,show,isloading,error,success,errorMessage}=this.state;
      
        return (
            <div>
                {/* <div className="updatestatus">{errorMessage} Error has Occured</div> */}
                <p className="loginerror">{errorMessage}</p>
                <Toast className="toast-page-center-password toast-body1" onClose={this.closeToast} show={show} delay={3000} autohide>
                    <Toast.Header className='toast-header1'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Update Successfull</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Password updated</Toast.Body>
                </Toast>     
                {   error && <Alert variant='danger ' className="toast-body2 toast-page-center page-center-password">
                    <div className="text-danger errorwrapper"><span className="errortitle">Update Failed</span> <i onClick={this.closeError} className="" aria-hidden="true"></i></div>
                    <p className="text-danger"></p>
                </Alert>}
                    <Col md={{span:12}}  className="useredit">  
                        <Row>
                           <Col md={{span:6}}>
                                <h6  className="">Enter New Password</h6>
                                <Form.Group >
                                    <Form.Control type="password" onChange={this.onchange} required value={password} id="password" placeholder="Enter Password" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <h6  className="">Confirm Password</h6>
                                    <Form.Group >
                                        <Form.Control type="password" onChange={this.onchange} required value={confirmPassword} id="confirmPassword" placeholder="Confirm Password" />
                                    </Form.Group>
                            </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    </Col>
                                        <Col md={6} className="update-btn-all password-reset">
                                                <Button variant='success update-btn u5' onClick={this.validate}>{isloading?'Updating...':'Update Password'}</Button>    
                                        </Col>
                            </Row>
                        </Col>
            </div>
          );
    }
}
 
export default ResetPassword;
