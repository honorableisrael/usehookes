import React,{Component} from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert'
import Toast from 'react-bootstrap/Toast'
//IMPORT  ENDPOINT ADDRESS
import API from '../../../assets/config';
import axios from 'axios';
import allCountries from './listOfCountriesInTheWorld';
//user
import Form from 'react-bootstrap/Form'
import '../../../LandingPage/Home/Home-components/Slider/Slider.css'

class PersonalDetails extends Component {
    state={
        focus:true,
        focus1:false,
        fullname:'',
        address:'',
        email:'',
        phonenumber:'',
        nationality:'',
        country:'Nigeria',
        selectedCountry:'',
        dateofbirth:'',
        stateOfResidence:'',
        sex:'',
        stateoforigin:'',
        male:false,
        validated:false,
        female:false,
        isloading:false,
        error:false,
        success:false,
        show:false,
        user:''
    }
    componentDidMount() {
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        const token = loggedIn?JSON.parse(loggedIn).token:''
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
         this.setState({
            user:res.data.user,
            fullname:res.data.user && res.data.user.lastname?(res.data.user.firstname+' '+ res.data.user.lastname):res.data.user.fullname,
            // fullname:res.data.user.fullname?:'',
            email:res.data.user?res.data.user.username:'',
            phonenumber:res.data.user?res.data.user.phone:'',
            address:res.data.user?res.data.user.address:'',
            country:res.data.user?res.data.user.country:'Nigeria',
            stateOfResidence:res.data.user?res.data.user.state:'',
            dateofbirth:res.data.user?res.data.user.dob:'',
            sex:res.data.user?res.data.user.sex:''
        })  
        })
        .catch(err=>{
            console.log(err)
        })
      };
      
      handleChange=(e)=>{
        this.setState({
          country: e.target.value,
        });
        }

    selectNationality=(e)=>{
        this.setState({
            nationality:e.target.value
        })
        console.log(e.target.value)
    }
    changetomale=(e)=>{
        console.log(this.state.sex)
        this.setState({sex:'male',male:true,female:false})
    }
    changetofemale=(e)=>{
        console.log(this.state.sex)
        this.setState({sex:'female',male:false,female:true})
    }
   onchange=(e)=>{
       this.setState({
           [e.target.id]:e.target.value
       })
   }

   updatePersonalDetails=()=>{
    this.setState({isloading:true,validated:true})
       const {sex,dateofbirth,address,stateOfResidence,country,nationality,phonenumber,user}=this.state;
       const userinfo = sessionStorage.getItem('adminDetails')
       const user_id = JSON.parse(userinfo)
       const id = user_id.user.id;
       var token = user_id.token;

       const data = {
        sex,
        dob: dateofbirth,
        address,
        state: stateOfResidence,
        nationality:country,
        country:country,
        phone: phonenumber,
       }
       console.log(data)
       axios.put(`${API}/api/v1/user/${id}`,data, { headers: { 'Authorization': `Bearer ${token}` } })
       .then(res=>{
           console.log(res)
           this.setState({
               isloading:false,
               success:true,
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
            error:true,
            showerror:true
        })
        window.scrollTo(-0,-0)
       })
       this.componentDidMount()
   }
    
    closeError = () =>{
        this.setState({
            error:false
        })         
    }
    closeToast=()=>{
        this.setState({show:false})
    }
    render() {
        const{fullname,female,success,male,dateofbirth,phonenumber,country,show,error,sex,showerror,address,stateOfResidence,email,isloading,user,name}=this.state;
        return (
            <div>
         {/* success toast starts*/}
                { <Toast className="toast-page-center toast-body1" onClose={this.closeToast} show={show} delay={3000}>
                    <Toast.Header className='toast-header1'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Update Successfull</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Personal details updated</Toast.Body>
                </Toast>}
            {/* success toast ends */}
            
            {/* error toast starts */}
            {/* success toast starts*/}
                 {/* <Toast className="toast-page-center toast-body-error" onClose={()=>this.setState({showerror:false})} show={showerror} delay={3000}>
                    <Toast.Header className='toast-header-error'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Update Failed</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Personal details Update failed</Toast.Body>
                </Toast> */}
            {   error && <Alert variant='danger ' className="toast-body2 toast-page-center">
                    <div className="text-danger errorwrapper"><span className="errortitle">Update Failed</span> <i onClick={this.closeError} className="fa fa-times" aria-hidden="true"></i></div>
                    <p className="text-danger"></p>
                </Alert>}
                <Col md={{span:12}}  className="useredit">
                                <h6  className="">Full Name</h6>
                                    <Form.Group >
                                        <Form.Control className="col-md-12"  type="text" onChange={this.onchange} required value={fullname} id="fullname" placeholder="Enter Full Name" />
                                </Form.Group>
                            <hr/>
                        <Row>
                            <Col md={6}>
                                <Form noValidate  onSubmit={this.SignUp} >
                                    <h6  className="">Date Of Birth</h6>
                                        <Form.Group >
                                            <Form.Control type="date" onChange={this.onchange} required value={dateofbirth} id="dateofbirth" />
                                        </Form.Group>
                                    </Form>
                            </Col>
                            <Col md={4} className="sex-wrapper">
                                <h6 className="gender">Gender</h6>
                                <Form.Group>
                                    <span className="male-button" value={true} style={{borderColor:male?"green":''}}  onClick={this.changetomale}>Male</span>
                                    <span className="female-button" value={female?'female':null} style={{borderColor:female?"green":''}} onClick={this.changetofemale}>Female </span>
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr/>
                         <Row>
                            <Col md={6}>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control value={address} onChange={this.onchange} id="address" as="textarea" rows="5"/>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group as={Col}>
                                    <Form.Label>Country</Form.Label>
                                        <Form.Control as="select"  onChange={this.handleChange}>
                                            <option>{country?country:'Nigeria'}</option>
                                            {allCountries.map(x=>(
                                                <option value={x.name} key={x.name} id="country">{x.name}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                <Form.Group as={Col} >
                                    <Form.Label>State</Form.Label>
                                    <Form.Control type="text" onChange={this.onchange} required value={stateOfResidence} id="stateOfResidence" placeholder="Enter State" />
                                </Form.Group>
                            </Col>
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
                                        <Form.Control type="tel" onChange={this.onchange} required value={phonenumber} id="phonenumber" placeholder="Enter Phone Number" />
                                </Form.Group>
                                <Col className="update-btn-all">
                             <Button type='submit' variant='success update-btn u4' onClick={this.updatePersonalDetails}>{isloading?'Updating...':'Update Personal Details'}</Button>    
                            </Col>
                            </Col>
                        </Row>   
                    </Col>
            </div>
          );
    }
}
 
export default PersonalDetails;
