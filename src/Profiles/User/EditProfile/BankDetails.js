import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './EditProfile.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import allCountries from './listOfCountriesInTheWorld';
//IMPORT  ENDPOINT ADDRESS
import API from '../../../assets/config';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
//user
import Form from 'react-bootstrap/Form'
import '../../../LandingPage/Home/Home-components/Slider/Slider.css'
//toast
import Toast from 'react-bootstrap/Toast'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';



class BankDetails extends Component {
    state={
        account_name:'',
        Bank_Country:'Nigeria',
        bank_name:'',
        account_no:'',
        success:false,
        BankList:'',
        islocal:true,
        error:false,
        show:false,
        isInternational:false,
        isloading:false
    }
    onchange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }
    
    
      
    closeError = () =>{
        this.setState({
            error:false
        })         
    }

    componentDidMount() {
        this.getBankList()//get bank list
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        const token = loggedIn?JSON.parse(loggedIn).token:''
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
         this.setState({
            user:res.data.user,
            account_no:res.data.user &&res.data.user.bank_details?res.data.user.bank_details.account_no:'',
            bank_name:res.data.user?res.data.user.bank_details.bank_name:'',
            account_name:res.data.user?res.data.user.bank_details.account_name:'',
        })   
        })
        .catch(err=>{
            console.log(err)
        })
      };
      
      getBankList=()=>{
          axios.get(`${API}/api/v1/banks`)
          .then(res=>{
            this.setState({
                BankList:res.data.banks
            })
          })
          .catch(err=>{
              console.log(err)
          })
      }
      
      handleChange=(e)=>{
        this.setState({
          Bank_Country: e.target.value,
        },this.setState({ bank_name:''}));
        this.changeBankToInternational()
        }
        changeBankToInternational=()=>{
         return  this.state.Bank_Country=='Nigeria'?false:true
        }

        //validate all feilds
        validate =(fail)=>{
            this.setState({isloading:true})
            const {account_no,account_name,bank_name,Bank_Country} = this.state;
            //check passwords
            if( account_no.trim()=== '' && bank_name.trim() === '' && Bank_Country.trim()==='' && account_name.trim()===''){
              console.log('error fill all')
               return this.setState({
                  errorMessage:"all entries are required",
                  isloading:false
                })
              }
            //check email and password
              // if( confirmPassword.trim()=='' && password.trim()!==''){
              //  return this.setState({
              //     isloading:false,
              //     fail:false
              //    })
              // }
              if( account_no.trim()!=='' && account_name.trim()!=='' && bank_name.trim()!=='' && Bank_Country.trim()!==''){
                 this.setState({
                   isloading:true,
                   fail:false
                  })
                  this.updateBankDetails()
                }  
           }
           //validate ends here
            handleChangeBank=(e)=>{
                this.setState({
                bank_name: e.target.value,
                });
                this.changeBankToInternational()
            }
            closeToast=()=>{
                this.setState({show:false})
            }
    updateBankDetails=()=>{
        this.setState({
            isloading:true
        })
        const {account_no,account_name,bank_name,Bank_Country} = this.state;
        const user = sessionStorage.getItem('adminDetails')
        const user_id = JSON.parse(user)
        const id = user_id.user.id;
        var token = user_id.token;

        const data = {
            account_name,
            account_no,
            country:Bank_Country,
            bank_name
        }
        console.log(data)
        axios.put(`${API}/api/v1/user/${id}/bank-details`,data, { headers: { 'Authorization': `Bearer ${token}` } })
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

    render() { 
        const{bvn,account_no,bank_name,account_name,isloading,Bank_Country,BankList,error,success,islocal,errorMessage,show}=this.state;
      
        return (
            <div>
                 <p className="loginerror">{errorMessage}</p>
                <Col md={{span:12}}  className="useredit">  
                 <Toast className="toast-page-center-bank toast-body1" onClose={this.closeToast} show={show} delay={3000}>
                    <Toast.Header className='toast-header1'>
                        <img
                        src="holder.js/20x20?text=%20"
                        className="rounded mr-2"
                        alt=""
                        />
                        <strong className="mr-auto">Update Successfull</strong>
                        <small></small>
                    </Toast.Header>
                    <Toast.Body>Bank details updated</Toast.Body>
                </Toast>
                {   error && <Alert variant='danger ' className="toast-body2 toast-page-center page-center-bank" dismissible>
                                <div className="text-danger errorwrapper"><span className="errortitle">Update Failed</span> <i onClick={this.closeError} className="fa fa-times" aria-hidden="true"></i></div>
                                <p className="text-danger"></p>
                            </Alert>}
                    <Row>
                        <Col md={6}>
                            <h6  className="">Account Name</h6>
                                <Form.Group >
                                    <Form.Control type="text" onChange={this.onchange} required value={account_name} id="account_name" placeholder="Enter Bank Account Name" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                        <h6  className=""> Bank Country</h6>
                            <Form.Control as="select"  onSelect={this.changeBankToInternational} onChange={this.handleChange}>
                                <option>{Bank_Country?Bank_Country:'Not Chosen...'}</option>
                                    {allCountries.map(x=>(
                                    <option value={x.name} key={x.name} id="country">{x.name}</option>
                                ))}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        {/* <Col md={6}>
                            <h6  className="">Account Name</h6>
                                <Form.Group >
                                    <Form.Control type="text" onChange={this.onchange} required value={firstname} id="firstname" placeholder="Enter First Name" />
                            </Form.Group>
                        </Col> */}
                        <Col md={{span:6}}>
                        <h6  className="">Account Number</h6>
                            <Form.Group >
                                <Form.Control type="tel" onChange={this.onchange} required value={account_no} id="account_no" placeholder="Enter Account Number" />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                           <h6  className=""> Bank Name</h6>
                                { islocal && !this.changeBankToInternational() ? 
                                
                                <Form.Control as="select" onChange={this.handleChangeBank}>
                                <option>{bank_name?bank_name:'Not Chosen...'}</option>
                                {BankList && BankList.map(x=>(
                                    <option value={x.name} key={x.name} id="country">{x.name}</option>
                                ))}
                                </Form.Control>
                                :
                                ''
                                }
                                {this.changeBankToInternational()?
                                <Form.Group className="bank-name">
                                <Form.Control type="text" onChange={this.onchange} required value={bank_name} id="bank_name" placeholder="Enter Bank Name" />
                                </Form.Group>                           :
                                ''
                                }
                            <Col  className="update-btn-all lastbtn-submit">
                                <Button variant='success update-btn u1' onClick={this.updateBankDetails}>{isloading?'Updating...':'Update Bank Details'}</Button>    
                            </Col>
                        </Col>
                      
                    </Row>
                </Col>
            </div>
          );
    }
}
 
export default BankDetails;
