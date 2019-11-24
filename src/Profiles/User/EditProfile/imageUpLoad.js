import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import './EditProfile.css'
import Button from 'react-bootstrap/Button';
import API from '../../../assets/config';
import axios from 'axios';



class MyVerticallyCenteredModal extends Component{
    state={
      selectedFile: null,
      userid:'',
      isloading:false,
      success:'',
      errorMessage:''
    }
    onChangeHandler=event=>{
        this.setState({
            selectedFile: event.target.files[0],
            errorMessage:'',
            success:'' 
          })
    }
    componentDidMount() {
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        console.log(userdata)
        axios.get(`${API}/api/v1/user`, { headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res)
            this.setState({
            userid:res.data.user.id
         })  
        })
        .catch(err=>{
            console.log(err.response)
            this.setState({
              errorMessage:'Failed to connect',
            })
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
        if(res.data.responseStatus===200) {
            this.setState({
                success:true,
                isloading:false,
                success:res.data.responseMessage
            })
            window.location.reload()
          }
      })
      .catch(err=>{
          console.log(err.response)
          this.setState({
            success:false,
            isloading:false,
            errorMessage:err.response?err.response.data.msg:'No Internet Connection',
        })

      })
    } 

      
     
    
    render(){
      const{isloading,success,errorMessage}=this.state
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
        <p className="text-success messagetocrm"> {success}</p>
        <p className="text-danger messagetocrm"> {errorMessage}</p>
        <Modal.Body>
          <p style={{textAlign:'center'}} className="submit-photo">
          <input type="file" className="input-file" name="file" onChange={this.onChangeHandler}/> <Button onClick={this.onClickHandler} className="uploadphotobtn" variant="success">{isloading?'Updating...':'Submit'}</Button>
          </p>
        </Modal.Body>
      </Modal>
    );
    }
  }

  export default MyVerticallyCenteredModal;