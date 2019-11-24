import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import {Link} from 'react-router-dom';
import './sponsor.css';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import API from '../../../../assets/config.js';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import NoSponsor from './NoSponsors';
import moment from 'moment';


const renderTooltip = props => (
    <div  
      {...props}
      style={{
        backgroundColor: 'white',
        padding: '2px 10px',
        color: 'black',
        fontSize:'13px',
        borderRadius: 3,
        width:'120px',
        ...props.style,
      }}
    >
     To see actual return you have to login or create an account 
    </div>) 
    //change dateformat
 const startDate=(date)=>{
    //change end of cycle date
    if(date){
        console.log(date)
    const trueDate = new Date(date)
    return moment(date).fromNow()
    }
    if(!date){
       return( <Spinner></Spinner>)
    }
}   
class ReservedProducts extends Component{
    state={
        user:'',
        products:'',
        errorMessage:'',
        isloading:false
    }
    
    //capitalize first letter
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    componentDidMount() {
        this.setState({
            isloading:true
        })
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        axios.get(`${API}/api/v1/user`,{ headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
            console.log(res.data.user.reservations)
         this.setState({
            products:res.data.user,
            isloading:false
         })  
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                errorMessage:'Failed to load Products',
                isloading:false
            })
        })
      };
    render(){
        const{user,products,isloading,errorMessage}=this.state;
        const loading = '#FFBF00';
        const finished = '#9B0000';
        const loaded = 'rgb(67,160,71)';
        const green = 'rgb(67,160,71)';
        return(
            <div className={products && products.reservations && products.reservations.length==0?"nosponsor-extra":''}>
                {products && products.reservations &&  products.reservations.length == 0 ?<NoSponsor btn={true} leftatsmalldevice={true} title="You have not reserved any product"/>:''}
                <Row className="product-list-wrapper nosponsor-extra1  product-list-wrapper1 userproducts">
                {isloading?(<div className="spinner-products loadingproduct"><Spinner animation="border" role="status">
                                        <span className="sr-only">Loading</span>
                            </Spinner></div>):''}
                            {products?products.reservations.map(x=>(
                                    <div className="list-item1" key={x.id}>
                                    <div className="product-itemz-image">
                                    <Link to={`${x.id}/reserved-product-description`}>
                                            <img src={x.imageUrl} className="product-itemz" alt="product-item"/>
                                        </Link>
                                    <Link className={this.capitalizeFirstLetter(x.productStatus)==='Loading'?'coming-btn':(x.productStatus==='Loaded'?'open-btn':'closed-btn')}>
                                        <span className={this.capitalizeFirstLetter(x.productStatus)==='Loading'?'dot-yellow':(x.productStatus==='Loaded'?'dot-green':'dot-red')}></span> {this.capitalizeFirstLetter(x.productStatus)}
                                    </Link>
                                    </div>
                                    <div className="product-itemz-body">
                                    <div className="prod-status-container">
                                        <span className="box-title-changed">
                                            <Link className="box-link" to={`${x.id}/reserved-product-description`}>
                                                {x.name}
                                            </Link>
                                        </span>
                                    </div>
                                <div className="box-cash-userdashboard">{x.reservedUnits} {x.reservedUnits=='1'?'Unit':'Units'} Reserved </div>
                                <div className="box-content-changed-userdashboard1">
                                        <i className="fa fa-bar-chart" aria-hidden="true"></i>  {x.return}% Returns  <span className="shiftright">&#8358;{x.returnAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                </div>
                                {/* <span className="box-content-changed-userdashboard1">
                                    
                                </span> */}
                                    <div className="info-tip-wrapper-changed" style={{borderColor:this.capitalizeFirstLetter(x.productStatus)==='Loading'?loading:(this.capitalizeFirstLetter(x.productStatus)==='Loaded'?loaded:finished)}}>
                                        <span className="box-content-changed">
                                       Loads {startDate(x.start)}
                                        </span>
                                    {x.canBuy?(<Link to={`${x.id}/reserved-product-description`}>
                                                    <Button variant="success" className="buy-reserved" >Buy</Button>
                                            </Link>):''}
                                    </div>   
                                </div>
                            </div>
                                )):''}
                                   {!isloading && errorMessage && this.state.products.length==0? <NoSponsor title={errorMessage}/>:'' }
                                   
                    </Row>  
            </div>
        )
    }
}

export default ReservedProducts;