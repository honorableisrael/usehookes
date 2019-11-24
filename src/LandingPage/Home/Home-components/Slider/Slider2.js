
import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Slider.css';
import './HomeSlider.css';
import img4 from '../../../../assets/leftarrow.jpg';
import img5 from '../../../../assets/rightarrow.jpg';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import API from '../../../../assets/config.js';
import Spinner from 'react-bootstrap/Spinner';
import moment from 'moment';
import axios from 'axios';

const onclickLeft = ()=> {
  scrollLeft(document.getElementById('content'), -370, 700);   
}

const onclickRight = () =>{
  scrollLeft(document.getElementById('content'), 370, 700);   
}
   
function scrollLeft(element, change, duration) {
  console.log(element)
   var start = element.scrollLeft,
       currentTime = 0,
       increment = 20;
       console.log('element is ' + element)

       
        
   var animateScroll = function(){        
       currentTime += increment;
       var val = Math.easeInOutQuad(currentTime, start, change, duration);
       element.scrollLeft = val;
       if(currentTime < duration) {
           setTimeout(animateScroll, increment);
       }
   };
   animateScroll();
}

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (currentTime, startValue, changeInValue, duration) {
 currentTime /= duration/2;
 if (currentTime < 1) return changeInValue/2*currentTime*currentTime + startValue;
 currentTime--;
 return -changeInValue/2 * (currentTime*(currentTime-2) - 1) + startValue;
};

//tool-tip

  const renderTooltip = props => (
  <div  
    {...props}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      padding: '2px 10px',
      color: 'white',
      borderRadius: 3,
      ...props.style,
    }}
  >
      To see actual return you have to login or create an account 
  </div>) 
  class ControlledCarousel2 extends Component {
      state = {
        products:'',
        clientIsLoggedIn:'',
        visible:5
      }
        componentDidMount() {
            //check if user is loggedin
        const loggedIn = sessionStorage.getItem('adminDetails');
        const imgUrl = loggedIn?JSON.parse(loggedIn):''
        this.setState({
            clientIsLoggedIn:imgUrl
        })
            //make request for products
            axios.get(`${API}/api/v1/products`)
            .then(res=>{
                this.setState({
                    products:res.data.products
                })
            })
            .catch(err=>{
                console.log(err.response)
            })
        }
        //capitalize first letter
       capitalizeFirstLetter=(string)=>{
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
      //date format function
        startDate=(date)=>{
          //change end of cycle date
          if(date){
          return moment(date).format("Do MMMM YYYY")
          }
          if(!date){
            return( <Spinner></Spinner>)
          }
      }
      render(){
        const loading = '#FFBF00';
        const finished = '#9B0000';
        const loaded = 'rgb(67,160,71)';
        const { products,clientIsLoggedIn } = this.state;
        console.log(products)
         return (
            <div className="sliderwrapper">
               <img src={img4} onClick={onclickLeft} id="left-button"/>
              <div className="center-changed" id="content">
                <div className="list-container2-changed" >
                  {
                    products?products.map(x=>(
                      <div className="list-item-changed" key={x.id}>
                      <div className="product-itemzz-changed"><Link to={`${x.id}/product-description`}> <img src={x.imageUrl} className="product-item-changed" alt="product-item"/> </Link><br/></div>
                        <div className="product-itemzz-body">
                          <div className="prod-status-container-changed"><span className="box-title-changed"><Link to={`${x.id}/product-description`} className="box-link-changed">{x.name}</Link> </span>
                            <Link to={`${x.id}/product-description`} className={this.capitalizeFirstLetter(x.status)=='Loading'?"coming-btn-changed shiftbtn":(this.capitalizeFirstLetter(x.status)=='Loaded'?"open-btn-changed shiftbtn":"closed-btn-changed shiftbtn")}>
                              <span className={this.capitalizeFirstLetter(x.status)=='Loading'?"dot-yellow":(this.capitalizeFirstLetter(x.status)=='Loaded'?"dot-green":"dot-red")}>
                                </span> {this.capitalizeFirstLetter(x.status)}</Link></div>
                                  <div className="box-cash">&#8358;{x.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per Unit </div>
                                    <div className="info-tip-wrapper-changed addedpadding" style={{borderColor:this.capitalizeFirstLetter(x.status)=='Loading'?loading:(this.capitalizeFirstLetter(x.status)=='Loaded'?loaded:finished)}}><span className="box-content-changed">
                                      <i className="fa fa-bar-chart" aria-hidden="true"></i><span className="returnssize"> Returns {x && !clientIsLoggedIn ?x.returnRangefrom+ '% -':''} {x && !clientIsLoggedIn ?x.returnRangeto +'%':''} {clientIsLoggedIn && x ?x.return+'%':''} in {x ? x.cycle :''} months</span></span>
                                        <div>
                                        {
                                          ! clientIsLoggedIn ? 
                                        <OverlayTrigger
                                              placement="right-start"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltip}
                                              >
                                            <i className="fa fa-info-circle" aria-hidden="true"></i>
                                        </OverlayTrigger>
                                        :
                                        ''
                                        }
                                    </div>
                                </div>
                                { this.capitalizeFirstLetter(x.status)=='Loading'?  <span class="load-text load-text-home" style={{top:'-407.195px',left:'0rem'}}> Loads {this.startDate(x.start)}</span>:<span class="load-text" style={{top:'-411.095px',opacity:'0',left:'0rem'}}> Loads {this.startDate(x.start)}</span>}
                              </div>
                          </div>
                    ))
                    :
                    ''
                  }
              </div>
              </div>
              <img src={img5} onClick={onclickRight} id="right-button"/>
             </div>
        )
    }
  }
export default ControlledCarousel2;