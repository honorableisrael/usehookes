import React from 'react';
import { useState,useEffect } from 'react';
//Link
import { Link,Redirect } from 'react-router-dom';
import './nav-bar.css';
import logo from '../../../../assets/pramopro4.png'
import logowhite from '../../../../assets/logo-white.svg';
import IsloggedOut from './Nav-SignInSignUp/IsLoggedOut';
import IsloggedIn from './Nav-SignInSignUp/IsloggedIn';
import SideNav from 'react-simple-sidenav';
import axios from 'axios';
import API from '../../../../assets/config';


const setRedirect = () => {
    sessionStorage.clear()
      this.setState({
        redirect: true
      })
  }

const logOutMobile =(e) => {
    e.preventDefault();
        const details = sessionStorage.getItem('adminDetails');
            const user_id = JSON.parse(details)
            var token = user_id.token;
            axios.get(`${API}/api/v1/logout`, { headers: { 'Authorization': `Bearer ${token}` } })
                    .then(res => {
                    (window.location.pathname = '/login')
                    sessionStorage.clear();
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        
     
const NavBar =(props)=>  {
        const [loggedinmobile,setLoggedInMobile] = useState('')
        const  [redirect] = useState(false)
        const [  showNav,setShowNav] = useState(false)
        const [ open,SetOpen ] = useState(false);   //declare state for nav toggle close
            const [user,setUser] = useState('')  
            const loggedIn = sessionStorage.getItem('adminDetails');
            const token = loggedIn?JSON.parse(loggedIn).token:''
                    const userdata = loggedIn?JSON.parse(loggedIn):'';   
                   useEffect(()=>{       
                    setUser(userdata.user)           //componentdidmount lifecycle method
                    axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
                    .then(res=>{
                        console.log(res)
                         setLoggedInMobile(res.data.user)
                        setUser(res.data.user)
                    })
                    .catch(err=>{
                        console.log(err)
                    })      
            },[])
            const renderRedirect = () => {
                if (redirect) {
                  return <Redirect to='/' />
                }
              }
            //logout function
            const logOut =(e) => {
                e.preventDefault();
                    const details = sessionStorage.getItem('adminDetails');
                        const user_id = JSON.parse(details)
                        var token = user_id.token;
                        axios.get(`${API}/api/v1/logout`, { headers: { 'Authorization': `Bearer ${token}` } })
                                .then(res => {
                                    setRedirect()
                                sessionStorage.clear();
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }

          const show=()=>{
                setShowNav({
                    showNav:true,
                })
          }

        return (
            <div>
                <div className="toggle">
                    <div className="icon-items-top">
                        <div><Link to="/" className=""><img src={logo} alt="pramopro-logo" height="40px"/></Link></div><div><i className="fa fa-bars" onClick={show} aria-hidden="true"></i></div>
                    </div>
                    {renderRedirect()}
                    {/* <div className="icon-items-top1">
                        <div><img src={logowhite} alt="pramopro-logo" height="40px"/></div><div><i className="fa fa-bars" onClick={show} aria-hidden="true"></i></div>
                    </div> */}
                </div>
                {/* mobile view of navbar*/}
                {/* sidenavstarts */}
                <SideNav
                    style={{background: showNav?'rgba(0, 0, 0, 0.7)':'inherit'}}
                    navStyle={{width:'70%', background:'#131313'}}
                    showNav        =  {showNav}
                    onHideNav      =  {() => setShowNav(false)}
                    titleStyle     =  {{backgroundColor: '#fff',color:'#444444',paddingLeft:10,paddingBottom:0,paddingTop:0,fontSize:17,textAlign:'left'}}
                    itemStyle      =  {{backgroundColor:'#131313',paddingLeft:25 }}
                    itemHoverStyle =  {{backgroundColor:'inherit'}}
                    title          = {[<div style={{display:'flex',justifyContent:'space-between',padding:'18px 10px 18px 17px'}}><img src={logo} alt="pramopro-logo" height="40px"/><i className="fa fa-close" onClick={() => setShowNav(false)}></i></div>]}  
                    items  = {[
                    <div className="nav-section-mobile">
                    <div>
                        
                    </div>
                    <div className="nav-item-mobile">
                        <Link to="/" className="menu-mobile-link">Home</Link>
                    </div>
                    <div className="nav-item-mobile">
                        <Link to="/about" className="menu-mobile-link">About</Link>
                    </div>
                    <div className="nav-item-mobile">
                        <Link to='/products' className="menu-mobile-link">Products</Link>
                    </div>
                    <div className="nav-item-mobile">
                        <Link to="/contact-us" className="menu-mobile-link">Contact</Link>
                    </div>
                    <div className="nav-item-mobile">
                    {!user? <Link to="/login" className="menu-mobile-link nav-btn1-2">Sign In</Link> :''}
                    </div>
                    <div className="nav-item-mobile">
                    {! user?  <Link to="/register" className="menu-mobile-link nav-btn1-1">Register</Link> :''}
                    </div>
                    <div className="nav-item-mobile">
                    {user? <Link to="/user-dashboard" className="menu-mobile-link nav-btn1-2 dashboardmobile" style={{color:'white'}}>Dashboard</Link>:''}
                    </div>
                    <div className="nav-item-mobile">
                    { user? <div className="menu-mobile-link nav-btn1-1 logoutmobile" style={{color:'white'}} onClick={logOutMobile}>Log Out</div>:''}
                    </div>
                   
                    </div>
                    ]}
                    />
                {/* sidenavends */}
                 <div className="nav-wrapper-mobile" className="nav-section1" style={{display:open?'block':'none'}}> {/*  if open is true display block */}
                
                <div className="nav-section-mobile">
                <div className="nav-item-mobile">
                    <Link to="/" className="menu-mobile-link">Home</Link>
                </div>
                <div className="nav-item-mobile">
                    <Link to="/about" className="menu-mobile-link">About</Link>
                </div>
                <div className="nav-item-mobile">
                    <Link to='/products' className="menu-mobile-link">Products</Link>
                </div>
                <div className="nav-item-mobile">
                {!user? <Link to="/login" className="menu-mobile-link">Sign In</Link> :''}
                </div>
                <div className="nav-item-mobile">
                {! user?  <Link to="/register" className="menu-mobile-link">Register</Link> :''}
                </div>
                <div className="nav-item-mobile">
                {user? <Link to="/user-dashboard" className="nav-link" style={{color:'white',padding:0}}>Dashboard</Link>:''}
                </div>
                <div className="nav-item-mobile">
                   { user? <span className="nav-link" style={{color:'white',padding:0}} onClick={logOut}>Log Out</span>:''}
                </div>
                <div className="nav-item-mobile">
                    <Link to="/contact-us" className="menu-mobile-link">Contact</Link>
                </div>
                </div>
                </div> 
                {/* web view of navbar */}
                <div className="nav-wrapper" style={{marginTop:props.top,top:props.top1}}>
                <div className="nav-section1">
                <div><Link to="/" className=""><img className="nav-logo" src={logo} alt="pramopro-logo" height="40px"/></Link></div>
                </div>
                <div className="nav-section2">
                <div className="nav-item"><Link to="/" className="menu-link">Home</Link></div>
                <div className="nav-item"><Link to="/about" className="menu-link">About</Link></div>
                <div className="nav-item"><Link to='/products' className="menu-link">Products</Link></div>
                <div className="nav-item" style={{marginRight:30}}><Link to="/contact-us" className="menu-link">Contact</Link></div>
                    {
                       ! user ?
                    <IsloggedOut/>:
                    <IsloggedIn user={user}/>
                     }
                </div>
                </div>    
            </div>
        );
}

export default NavBar   