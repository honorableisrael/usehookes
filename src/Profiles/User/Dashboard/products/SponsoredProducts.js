import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './sponsor.css'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import API from '../../../../assets/config';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import NoSponsor from './NoSponsors';
import moment from 'moment';

 //change dateformat
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
        download receipt
    </div>) 
   const downloadReciept = () =>{
        //fetch user info
        // const loggedIn = sessionStorage.getItem('adminDetails');
        // const userdata = loggedIn?JSON.parse(loggedIn):''
        // const token = loggedIn?JSON.parse(loggedIn).token:''
        
        // axios.get(`${API}/api/v1/orders/${x}/receipt`,{ headers: { 'Authorization': `Bearer ${token}` } })
        // .then(res=>{
        //     console.log(res)
        // })
        // .catch(err=>{
        //     console.log(err)
        // })
    }
class SponsoredProducts extends Component{
    state={
        user:'',
        products:'',
        barrelCost:'',
        errorMessage:'',
        visible: 6,
        isloading:false
    }
    componentDidMount() {
        this.setState({
            isloading:true
        })
        //fetch user info
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''
        const token = loggedIn?JSON.parse(loggedIn).token:''
        //load  product list
        axios.get(`${API}/api/v1/user`,{ headers: { 'Authorization': `Bearer ${token}` } })
        .then(res=>{
         this.setState({
            products:res.data.user,
            isloading:false
         })   
         console.log(this.state.products)
        })
        .catch(err=>{
            console.log(err)
            this.setState({
                errorMessage:'Failed to load Products',
                isloading:false
            })
        })
      };
   
      //LOADMORE HANDLER
      loadMore=()=>{
        this.setState((prev) => {
          return {visible: prev.visible + 3};
        });
      }

      //capitalize first letter
    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    render(){
        const endOfCycle=(date)=>{
            //change end of cycle date
            if(date){
            return moment(date).format("Do MMMM YYYY")
            }
            if(!date){
               return( "")
            }
        }
        
        const{user,products,errorMessage,isloading}=this.state;
        const loading = '#FFBF00';
        const finished = '#9B0000';
        const loaded = 'rgb(67,160,71)';
        const green = 'rgb(67,160,71)';
        console.log(products.orders)
        return(
            <div>
                <div className={!products?"userthirditems nosponsor-extra":"userthirditems"}>
                    {products && products.orders && products.orders.length == 0 ?<NoSponsor btn={true} leftatsmalldevice="leftatsmalldevice" title="You have not bought any product"/>:''}
                            <Row className="product-list-wrapper product-list-wrapper1 userproducts">
                            {
                            isloading?
                            (<div className="spinner-products loadingproduct">
                                <Spinner animation="border" role="status">
                                        <span className="sr-only">Loading</span>
                                </Spinner>
                            </div>
                            )
                            :
                            ''      
                            }
                            {products && products.orders ? products.orders.slice(0, this.state.visible).map(x=>(
                                        <div className="list-item1" key={x.id}>
                                        <div className="product-itemz-image">
                                                <img src={x.imageUrl} className="product-itemz" alt="product-item"/>
                                        {/* <Button className={x.productStatus==='loading'?'coming-btn':(x.productStatus==='loaded'?'open-btn':'closed-btn')}>
                                            <span className={x.productStatus==='loading'?'dot-yellow':(x.productStatus==='loaded'?'dot-green':'dot-red')}></span> {this.capitalizeFirstLetter(x.productStatus)}
                                        </Button> */}
                                        </div>
                                        <div className="product-itemz-body" style={{borderColor:this.capitalizeFirstLetter(x.productStatus)==='Loading'?loading:(this.capitalizeFirstLetter(x.productStatus)==='Loaded'?loaded:finished)}}>
                                        <div className="prod-status-container">
                                            <span className="box-title-changed" >
                                                    {x.name}
                                            </span>
                                        </div>
                                    <div className="box-cash-userdashboard">{x.unitsBought.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} {x.unitsBought=='1'?'Unit':'Units'} Purchased</div>
                                        <div className="info-tip-wrapper-changed-userdashboard" style={{paddingBottom:0}}>
                                            {/* <span className="box-content-changed-userdashboard">
                                                Cycle ends {endOfCycle(x.cycleEndDate)}
                                            </span> */}
                                            <span className="box-content-changed-userdashboard1" style={{paddingLeft:11}}>
                                                <i className="fa fa-bar-chart" aria-hidden="true"></i> {x.return}% Returns  &#8358;{x.returnAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            </span>
                                            <OverlayTrigger
                                                placement="bottom-start"
                                                delay={{ show: 250, hide: 400 }}
                                                overlay={renderTooltip}
                                                >
                                                <a href={`${API}/api/v1/orders/${x.id}/receipt`}><i className="fa fa-download" value={x.id} onClick={downloadReciept} aria-hidden="true"></i></a>
                                            </OverlayTrigger>
                                        </div>
                                        { x? <span className="loadendstext" style={{top:'-315px'}}>  Cycle ends {endOfCycle(x.cycleEndDate)}</span>:<span className="loadendstext" style={{top:'-21.094rem',opacity:'0'}}> Loads {this.startDate(x.start)}</span>}   
                                    </div>
                                </div>
                                    )):''}
                                </Row>
                                {!isloading && errorMessage && this.state.products.length==0? <NoSponsor title={errorMessage}/>:'' }
                                    {products && products.orders && this.state.visible < products.orders.length && <div className="loadmorecont"><div className=""><Link onClick={this.loadMore} className="product-btn user-loadmore">load more</Link></div></div>}
                                </div>
                        </div>
                    )
                }
            }

export default SponsoredProducts;