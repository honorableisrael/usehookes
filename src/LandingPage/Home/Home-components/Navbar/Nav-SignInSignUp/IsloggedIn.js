import React,{Component} from 'react';
import '../nav-bar.css'
import img1 from '../../../../../assets/avatar.svg'
import { Link,Redirect } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import API from '../../../../../assets/config';
import axios from 'axios';

class IsloggedIn extends Component {
    constructor(props){
        super(props)
        this.state={
            redirect:false,
            socialImage:''
        }
    }
     
  setRedirect = () => {
    sessionStorage.clear()
      this.setState({
        redirect: true
      })
      window.location.pathname = '/'
  }
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }
  splitName=(name)=>{
    const lastname = name.split(' '); // returns "Panakkal"
    return lastname[0]
  }
  logOut = e => {
    e.preventDefault();
    const userPhoto = sessionStorage.getItem('userprofilephoto')
    const loggedIn = sessionStorage.getItem('adminDetails');
    console.log(userPhoto)
    const imgUrl = loggedIn?JSON.parse(userPhoto):''
    this.setState({
      socialImage:imgUrl
    })
    const userdata = loggedIn?JSON.parse(loggedIn):''
    const token = loggedIn?JSON.parse(loggedIn).token:''
        axios
          .get(`${API}/api/v1/logout`,{ headers: { 'Authorization': `Bearer ${token}` } })
            .then(res => {
            this.setRedirect()
            sessionStorage.clear();
        })
        .catch(err=>{
          console.log(err)
        })
  }
    render(){
      const {socialImage} = this.state
    return (
        <div className="nav-section2">
             <div className="dropdownwrapper">
                {this.renderRedirect()}
                    <NavDropdown className="navtitle" title={`Hi  ${this.props.user.fullname?this.splitName(this.props.user.fullname):this.props.user.firstname}`} id="collasible-nav-dropdown">
                        <NavDropdown.Item><Link to="/user-dashboard" className="nav-link">Dashboard</Link></NavDropdown.Item>
                            <NavDropdown.Divider />
                        <NavDropdown.Item onClick={this.logOut}><span className="nav-link">Log Out</span></NavDropdown.Item>
                    </NavDropdown>
                </div>
            <div className="dropdownwrapper"><img src={this.props.user.profileImage?this.props.user.profileImage:(this.props.user.socialImageUrl?this.props.user.socialImageUrl:img1)} className="profilephoto" alt='profilephoto'/></div>
        </div>
    );
}
}
export default IsloggedIn;
