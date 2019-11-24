import React,{Component} from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import './Slider.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import API from '../../../../assets/config';


const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const renderTooltip = props =>(
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

class Carousel1 extends Component{
  state = {
    accordionstate:false,
    showNav:false,
    products:'',
    sortbyLoading:false,
    sortbyLoaded:false,
    sortbyFinished:false,
    clientIsLoggedIn:''
  }
  capitalizeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
    placeOrderForProduct=()=>{
      const user = sessionStorage.getItem('adminDetails')
      const productId = this.props.match.params.id;
      const user_id = JSON.parse(user)
      var token = user_id.token;
      axios.post(`${API}/api/v1/products/${productId}/order`,{ headers: { 'Authorization': `Bearer ${token}`}})
      .then(res=>{
          console.log(res)
          alert('product order successfull')
      })
      .catch(err=>{
          console.log(err.response)
          alert('product order failed')
      })
    }
    //change date
    startDate=(date)=>{
      //change end of cycle date
      if(date){
      return moment(date).format("Do MMMM YYYY")
      }
      if(!date){
         return( <Spinner></Spinner>)
      }
    }
    componentWillMount(){
        //check if user is loggedin
        const loggedIn = sessionStorage.getItem('adminDetails');
        const imgUrl = loggedIn?JSON.parse(loggedIn):''
        this.setState({
            clientIsLoggedIn:imgUrl
        })
    const {sortbyFinished,sortbyLoaded,sortbyLoading}=this.state;
        if(!sortbyFinished && !sortbyLoaded &&!sortbyLoading){
        axios.get(`${API}/api/v1/products`)
        .then(res=>{
        this.setState({
            products:res.data.products
        })
        console.log(res)
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
  render(){
    const loading = '#FFBF00';
    const finished = '#9B0000';
    const loaded = 'rgb(67,160,71)';
    const {clientIsLoggedIn} = this.state;
    return(
    <div>
    {/* custom button starts */}
      
    {/* custom button ends here */}
    <Carousel
    additionalTransfrom={0}
    arrows
    autoPlay={true}
    autoPlaySpeed={3000}
    centerMode={false}
    containerClass="container-with-dots"
    dotListClass=""
    draggable
    focusOnSelect={false}
    infinite={true}
    itemClass=""
    keyBoardControl
    minimumTouchDrag={80}
    renderDotsOutside={false}
    responsive={{
      desktop: {
        breakpoint: {
          max: 3000,
          min: 1024
        },
        items: 3,
        paritialVisibilityGutter: 40
      },
      mobile: {
        breakpoint: {
          max: 710,
          min: 0
        },
        items: 1,
        paritialVisibilityGutter: 30
      },
      tablet: {
        breakpoint: {
          max: 1024,
          min: 710
        },
          items: 2,
          paritialVisibilityGutter: 30
        }
      }}
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >          {this.state.products &&  this.state.products.map((x,index)=>(
                <div className="list-item" key={index}>
                <div className="product-itemz-image">
                    <Link to={`${x.id}/product-description`}>
                      <img src={x.imageUrl} className="product-itemz" alt="product-item"/>
                    </Link>
                  <a className={this.capitalizeFirstLetter(x.status)==='Loading'?'coming-btn':(this.capitalizeFirstLetter(x.status)=='Loaded'?'open-btn':'closed-btn')}>
                    <span className={this.capitalizeFirstLetter(x.status)==='Loading'?'dot-yellow':(this.capitalizeFirstLetter(x.status)=='Loaded'?'dot-green':'dot-red')}></span> {this.capitalizeFirstLetter(x.status)}
                </a>
                </div>
                <div className="product-itemz-body">
                <div className="prod-status-container">
                    <span className="box-title-changed" >
                        <Link className="box-link" to={`${x.id}/product-description`}>
                            {x.name}
                        </Link>
                    </span>
                </div>
            <div className="box-cash">&#8358;{x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per Unit</div>
                <div className="info-tip-wrapper-changed" style={{borderColor:this.capitalizeFirstLetter(x.status)==='Loading'?loading:(this.capitalizeFirstLetter(x.status)==='Loaded'?loaded:finished)}}>
                    <span className="box-content-changed">
                        <i className="fa fa-bar-chart" aria-hidden="true"></i> Returns {x && !clientIsLoggedIn ?x.returnRangefrom+ '% -':''} {x && !clientIsLoggedIn ?x.returnRangeto +'%':''} {clientIsLoggedIn && x ?x.return+'%':''} in {x ? x.cycle :''} months
                    </span>
                    {
                    !clientIsLoggedIn?
                    <OverlayTrigger
                        placement="bottom-start"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                        >
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </OverlayTrigger>
                    :
                    ''
                    }
                   
                </div>
                { this.capitalizeFirstLetter(x.status)=='Loading'?  <span className="load-text load-text-smallscreen" style={{top:'-21.09472rem',width:'max-content'}}> Loads {this.startDate(x.start)}</span>:<span className="load-text" style={{top:'-21.094rem',opacity:'0'}}> Loads {this.startDate(x.start)}</span>}   
            </div>
          </div>
            ))
          
          }
    </Carousel>
    </div>
    )
}
}
export default Carousel1;