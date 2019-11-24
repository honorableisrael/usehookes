import React,{Component} from 'react';
import './EditProfile.css'
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
//IMPORT  ENDPOINT ADDRESS
import API from '../../../assets/config';
import Alert from 'react-bootstrap/Alert'
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import '../../../LandingPage/Home/Home-components/Slider/Slider.css';
import Toast from 'react-bootstrap/Toast'


class NextOfKin extends Component {
    state={
        firstname:'',
        lastname:'',
        name:'',
        relationship:'',
        address:'',
        state:'',
        country:'',
        phone:'',
        email:'',
        success:false,
        isloading:false,
        user:'',
        error:false,
        show:false,
    }
    onchange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    componentDidMount() {
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        // const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
         this.setState({
            user:res.data.user,
            name:res.data.user?res.data.user.next_of_kin.name:'',
            phone:res.data.user?res.data.user.next_of_kin.phone:'',
            email:res.data.user?res.data.user.next_of_kin.email:'',
            relationship:res.data.user?res.data.user.next_of_kin.relationship:''
         })
        })
        .catch(err=>{
            console.log(err)
        })
      };
      handleSelect=(e)=>{
            this.setState({
                relationship:e.target.value
            })
      }
      
    closeError = () =>{
        this.setState({
            error:false
        })         
    }
      validate =(fail)=>{
        this.setState({isloading:true})
        fail=this.state.fail
        const {confirmPassword,password} = this.state;
         //check passwords
        if( password.trim() && confirmPassword.trim() === ''){
           return this.setState({
              fail:true,
              errorMessage:"please fill the empty feild(s)",
              isloading:false
            })
          }
      //check email and password
        if( confirmPassword !== password){
          return  this.setState({
              fail:true,
              errorMessage:"password must be the same",
              isloading:false
            })
          }  
          if( confirmPassword == password){
             this.setState({
               isloading:true,
               fail:false
              })
              this.updateNextOfKinInformation()
            }  
       }
       

    updateNextOfKinInformation=()=>{
        this.setState({
            isloading:true
        })
        const{firstname,lastname,relationship,state,name,country,phone,email,isloading}=this.state;
        const user = sessionStorage.getItem('adminDetails')
        const user_id = JSON.parse(user)
        const id = user_id.user.id;
        var token = user_id.token;

        const data = {
            name,
            relationship,
            phone,
            email,
        }
        console.log(data)
        axios.put(`${API}/api/v1/user/${id}/next-of-kin`,data, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
            this.setState({
                isloading:false,
                show:true
            })
            window.scrollTo(-0,-0)
        },
        setInterval(
                this.closeToast,
            4000
        ))
        .catch(err=>{
            console.log(err)
            this.setState({
                isloading:false,
                error:true
            })
            window.scrollTo(-0,-0)
        },setInterval(
            this.closeError,
        3000
    ))
    }
    closeToast=()=>{
        this.setState({show:false})
    }
    render() {
        const{firstname,lastname,relationship,name,isloading,show,address,state,country,error,phone,email}=this.state;
      
        return (
            <div>
                 { <Toast className="toast-page-center-nok toast-body1" onClose={this.closeToast} show={show} delay={3000}>
                    <Toast.Header className='toast-header1'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Update Successfull</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Next of kin details updated</Toast.Body>
                </Toast>}
                { error && 
                <Alert variant='danger ' className="toast-body2 toast-page-center page-center-nok">
                    <div className="text-danger errorwrapper"><span className="errortitle">Update Failed</span> <i onClick={this.closeError} className="fa fa-times" aria-hidden="true"></i></div>
                    <p className="text-danger"></p>
                </Alert>}
               <Col md={{span:12}}  className="useredit">
                        <Row>
                            <Col md={6}>
                                <h6  className="">Full Name</h6>
                                    <Form.Group >
                                        <Form.Control type="text" onChange={this.onchange} required value={name} id="name" placeholder="Enter Full Name" />
                                    </Form.Group>
                            </Col>
                            <Col md={6}>
                                <h6  className="">Relationship</h6>
                                    <Form.Group >
                                        <Form.Control type="text" onChange={this.onchange} required value={relationship} id="relationship" placeholder="Relationship" />
                                    </Form.Group>
                            </Col>
                                    <Form.Label></Form.Label>
                        {/* <Col md={6}>
                            <h6  className="">Last Name</h6>
                                    <Form.Group >
                                        <Form.Control type="text" onChange={this.onchange} required value={lastname} id="lastname" placeholder="Enter Last Name" />
                                </Form.Group>
                            </Col> */}
                        </Row>  
                        <Row>
                          
                        </Row>
                        <hr/>
                        <Row>
                            <Col md={6}>
                                <h6  className="">Email</h6>
                                    <Form.Group >
                                        <Form.Control type="text" onChange={this.onchange} required value={email} id="email" placeholder="Enter Email" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                            <h6  className="">Phone Number</h6>
                                <Form.Group >
                                    <Form.Control type="tel" onChange={this.onchange} required value={phone} id="phone" placeholder="Enter Phone Number" />
                                </Form.Group>
                                <Col className="update-btn-all" >
                                    <Button variant='success update-btn u3' onClick={this.updateNextOfKinInformation}>{isloading?'Updating...':'Update Next Of Kin'}</Button>    
                                </Col>
                            </Col>
                        </Row>
                        </Col>
            </div>
          );
    }
}
 
export default NextOfKin;
