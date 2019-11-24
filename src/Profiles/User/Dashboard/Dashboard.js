import React, { Component } from 'react';
import {Link,Redirect} from 'react-router-dom';
import moment from 'moment';
import './Dashboard.css'
import '../../../LandingPage/Product/product.css';
import '../../../LandingPage/Product/productlist.css';
import '../../../LandingPage/Home/Home';
import Navbar from '../../../LandingPage/Home/Home-components/Navbar/nav-bar';
import Footer  from '../../../LandingPage/Home/Home-components/Footer/Footer';
import Row from 'react-bootstrap/Row';
import img1 from '../../../assets/avatar.svg';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Row from 'react-bootstrap/Row';
//user
import '../../../LandingPage/Home/Home-components/Slider/Slider.css'
//IMPORT  ENDPOINT ADDRESS
import API from '../../../assets/config.js';
import axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReservedProducts from './products/ReservedProducts';
import SponsoredProducts from './products/SponsoredProducts';
import MyVerticallyCenteredModal from '../EditProfile/imageUpLoad';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Spinner from 'react-bootstrap/Spinner';
import PurchaseSummary from '../Dashboard/products/PurchaseSummary'


class UserDashboard extends Component {
    state={
        focus:true,
        focus1:false,
        user:'',
        token:'',
        products:'', 
        modalShow:false,
        hasprofileimage:false,
        redirect:false,
        endOfCycle:'',
        expectedReturn:'',
        show:false,
        success:'',
        errorMessage:'',
        socialImage:'',
        message:'',
        isverified:false,
        subject:'',
        iscomplete:true,
        isloading:''
    }
    topTab=()=>{
       this.setState(prevState=>({
           focus:!prevState.focus1?true:false
       }))
    }
    topTab1=()=>{
        this.setState(prevState=>({
            focus1:!prevState.focus?true:false
        }))
     }
    onchange=(e)=>{
       this.setState({
        [e.target.id] : e.target.value,
        errorMessage:''
       })
    }
    setRedirect = () => {
        sessionStorage.clear()
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/login' />
        }
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
            this.setState({
                isloading:false,
                errorMessage:'Message Sending Failed',
             })
        })
    }
    componentDidMount(){
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        this.setState({token:token})
        if(!userdata){
           return this.props.history.push('/login')
        }
        this.checkIfUserIsVerified(token)
        const userId = userdata.user.id
        axios.get(`${API}/api/v1/user/${userId}/statistics`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
            this.setState({
                endOfCycle:res.data.endOfCycle,
                expectedReturn:res.data.expectedReturn
            })
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                errorMessage:"Failed to load try again later"
            })
        })
    }
    endOfCycle=(date)=>{
        //change end of cycle date
        if(date){
        let todayDate =  moment(date).format("Do MMM YYYY")
        if(!todayDate == 'Invalid date'){
            return todayDate
        }
        if(todayDate !== 'Invalid date'){
            return todayDate
        }   
        }
        if(date===''){
           return(" ")
        }
    }
    checkIfUserIsVerified=(token)=>{
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
        console.log(res)
         if(res.data.user.verified===false){
           return this.props.history.push('/verify-account')
        }
        })
        .catch(err=>{
            console.log(err)
        })
    }
     componentWillMount() {
        window.scrollTo(-0,-0)
        //fetch user info
        const userPhoto = sessionStorage.getItem('userprofilephoto')
        const loggedIn = sessionStorage.getItem('adminDetails');
        const imgUrl = loggedIn?JSON.parse(userPhoto):''
        this.setState({
            socialImage:imgUrl
        })
        const userdata = loggedIn?JSON.parse(loggedIn):''   
        if(!userdata){
           return this.props.history.push('/login')
        }
        const token = loggedIn?JSON.parse(loggedIn).token:''
        console.log(userdata.user.id)
        if (userdata==='') {
         return this.setRedirect();
        }
        
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
        console.log(res)
        if(res.data.responseStatus===200){
           return this.setState({
                user:res.data.user,
                isverified:res.data.user.verified
            })
        }
         if(!res.data.user.verified){
           return this.props.history.push('/verify-account')
        }
        if(res.data.responseStatus===401){
            sessionStorage.clear()
           return this.props.history.push('/login')
         }
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                errorMessage:"Failed to load try again later"
            })
        })
      };

    render() {
        const handleClose = () => this.setState({show:false,message:'',isloading:false,subject:''});
        const handleShow = () => this.setState({show:true,message:'',isloading:false,subject:''});
        const{focus,focus1,message,subject,iscomplete,isverified,isloading,success,modalShow,user,socialImage,errorMessage,expectedReturn,show,endOfCycle}=this.state;
        console.log(this.state.user)
        //tooltip
        const renderTooltip = props => (
            <div  
              {...props}
              style={{
                backgroundColor: 'white',
                padding: '2px 10px',
                color: 'black',
                fontSize:'13px',
                borderRadius: 3,
                width:'400px',
                ...props.style,
              }}
            >
            Please complete your profile information.
            Bank Details and other information are used by Pramopro when making end of cycle payment.
            </div>)
                if(isverified){
                    return (
                        <div>
                            {this.renderRedirect()}
                            <Navbar top="3.3rem" top1="-3.3rem" user={user}/>
                            <Container className="page-wrapper-user" fluid={true}>
                                <Row className="userfirstcontent">
                                    <Col md={{span:10,offset:1}}  className="userfirstitems-welcome">
                                        <div  className="user-info-wrapper">
                                            <img  className="user-profile-photo" src={user.profileImage?user.profileImage:(socialImage?socialImage:img1)} alt="userImage" />
                                            <div className="user-welcome-text">
                                                <h4 className="username">
                                                    Welcome {user.firstname?user.firstname:''} {user.lastname?user.lastname:(user.fullname?user.fullname:'')} 
                                                    </h4>
                                                        <h6> <i className="fa fa-calendar"></i>Trading Since {user.dateRegistered}
                                                    </h6>
                                                </div>    
                                            </div>
                                        <hr/>
                                        <Col>
                                        <ButtonToolbar>
                                            <MyVerticallyCenteredModal
                                                show={modalShow}
                                                onHide={() => this.setState({modalShow:false})}
                                            />
                                            </ButtonToolbar>
                                        </Col>
                                        <Col md={{span:12}}  className="userseconditems">
                                            <div className="usersecondcontent"> <div className="container-invite-friends"><div className="user-item user-item1"  onClick={handleShow}><i className="fa fa-address-book"></i>Contact Account Officer</div><Link to='/products' className="user-item user-item2" ><i class="fa fa-cart-plus"></i> View Products</Link></div><div>
                                                {iscomplete ?
                                                <Link className="user-btn" to="/edit-profile">Edit Profile</Link>:
                                                <OverlayTrigger
                                                placement="left-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip}
                                                >
                                                <Link className="user-btn shakingeditbutton" to="/edit-profile">Edit Profile</Link>
                                                    </OverlayTrigger>
                                                    }
                                                </div>
                                            </div>
                                        </Col>
                                    </Col>
                                </Row>
                                <Row className="userfirstcontent">
                                    <Col md={{span:10,offset:1}}  className="userfirstitems1">
                                    <Col md={{span:2}}  className="userseconditems1">
                                    <h5 className="user-header2"> </h5>                            
                                    </Col>
                                    <Col md={{span:12}}  className="userseconditems1 userseconditems2">
                                        <div className="user-box-container">
                                            <div className="user-item-box1">
                                                <span className="box-2">
                                                    <span className="box-3">
                                                        ER
                                                    </span>
                                                </span>
                                                    <span className="box-1 user-data-info">
                                                        My Expected Return 
                                                        &nbsp;&nbsp;&nbsp;
                                                        &nbsp;&nbsp;&nbsp;   
                                                    <span className="cashindashboard"> &#8358;{expectedReturn?expectedReturn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):0.00}</span>
                                                    </span>
                                                </div>
                                            <div className="user-item-box2">
                                                <span className="box-2">
                                                    <span className="box-3">
                                                        ECD 
                                                    </span>
                                                </span>
                                                <span className="box-1">
                                                    End-of-cycle day<br/>
                                                    <span className="cashindashboard"> {this.endOfCycle(endOfCycle)}</span>
                                                </span>
                                            </div>
                                            <div className="user-item-box3">
                                                <span className="box-2">
                                                    <span className="box-3">
                                                        CR
                                                    </span>
                                                </span>
                                                <span className="box-1 user-data-info">
                                                    Collected Return
                                                    &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;   &nbsp;&nbsp;&nbsp;    
                                                    <span className="cashindashboard">&#8358;0</span>
                                                </span>
                                            </div>
                                        </div>
                                    </Col>
                                    </Col>
                                </Row>
                                <Row className="userfirstcontent">
                                    <Col md={{span:10,offset:1}}  className="userfirstitems2">
                                        {/* <Button variant="primary">
                                            Launch demo modal
                                        </Button> */}
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
                                            <Tabs defaultActiveKey="ProductsSponsored"  id="uncontrolled-tab-example">
                                            <Tab eventKey="ProductsSponsored" title="Products Purchased" >
                                            <SponsoredProducts />  
                                            </Tab>
                                            <Tab eventKey="ProductsReserved"  title="Products Reserved">
                                            <ReservedProducts/>
                                            </Tab>
                                            <Tab eventKey="PurchaseSummary"  title="Transaction Summary">
                                            <PurchaseSummary transactioninfo={user.orders}/>
                                            </Tab>
                                        </Tabs>
                                    </Col>
                                </Row>
                            </Container>
                            <Footer />
                        </div>
                    );
            
                }//isverified block ends here
                else if (!isverified){
                    return(<div className="isverified">
                        <Spinner variant="success" animation="border" role="status">
                        </Spinner>
                        <div  className="loadingspinnerdashboard">
                            Loading...
                        </div>
                    </div>
                    )
                }
            }
}

export default UserDashboard;