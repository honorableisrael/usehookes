import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import pramoprologo from '../../../assets/pramopro4.png'

class Statistics1 extends Component {

    state = {
        date: new Date(),
        day:moment().day(),
        productStats:''
    }

    componentDidMount() {
        const loggedIn = sessionStorage.getItem('adminDetails');
        const userdata = loggedIn?JSON.parse(loggedIn):''   
        if(!userdata){
           return this.props.history.push('/')
        }
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
        axios.get(`https://staging.pramopro.com/api/v1/statistics/product/units`)
        .then(res=>{
            console.log(res)
            this.setState({
                productStats:res.data
            })
        })
        .catch(err=>{
            console.log(err)
        })
      }

      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }

    liveDates=(date)=>{
        date = this.state.date
        if(date){
        let todayDate =  moment(date).format(" ddd, Do MMM YYYY")
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
    liveTime=(date)=>{
        date = this.state.date
        if(date){
        let todayDate =  moment(date).format('h : mm : ss a')
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
    render() {
        const {productStats} = this.state;
        console.log(this.state.productStats)
        const number = 2000000
        return (
            <div>
                <Container>
                    <Row className="admin-stats-wrapper">
                        <Col md={12} sm={12} lg={12} className="firststatscol">
                            <div className="firstwrapperstats">
                                <img src={pramoprologo} className="logostats" width="90" height="50" alt="pramoprologo"/>
                                <div className="firststatsbox">
                                    <div className="statscontent1">
                                        Live Stats
                                    </div>
                                    <div className="statscontent2">
                                       {this.liveDates()}
                                        <div>
                                           {this.liveTime()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                            <div className="secondstatsboxfirstpage">
                                <div className="ourtext">
                                    TOTAL TRADERS
                                </div>
                                <div className="totalusers">
                                    {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>                            
                                    <div className="totalusersnumber">
                                        {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Total Users</span>
                                    </div>
                            </div>
                            <div className="secondstatsboxwhite" style={{width: 'max-content'}}>
                                <div className="ourcash">
                                    Total Collection
                                </div>                            
                                <div className="totalusersnumber1" style={{fontSize:'60px'}}>
                                &#8358; {productStats?productStats.totalMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                            </div>
                            <div className="secondstatsboxfirstpage">
                                <div className="ourtext">
                                    TOTAL UNITS REMAINING
                                </div>
                                <div className="totalusers">
                                    {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div>                            
                                    <div className="totalusersnumber1">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Total Projects</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ournumbers">
                                    AGO
                                </div>
                                <div className="totalusers">
                                {productStats?productStats.agoUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ournumbers ">
                                    LPG
                                </div>
                                <div className="totalusers">
                                {productStats && productStats.lpgUnitsLeft?productStats.lpgUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                               </div>
                            <div className="secondstatsbox">
                                <div className="ournumbers">
                                    DPK
                                </div>
                                <div className="totalusers">
                                {productStats?productStats.dpkUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ournumbers">
                                   HHK
                                </div>
                                <div className="totalusers">
                                {productStats?productStats.hhkUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ournumbers ">
                                    LPFO
                                </div>
                                <div className="totalusers">
                                {productStats?productStats.lpfoUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox" style={{opacity:'0'}}>
                                <div className="ournumbers" >
                                    DPK
                                </div>
                                <div className="totalusers">
                                {productStats?productStats.dpkUnitsLeft.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Units Left</span>
                                    </div>
                            </div>
                    </Row>
                    <Row className="prevclass">
                    <div className="prevclass">
                               <Link to='/admin-stats' style={{color:'#444444'}}>Next <i className="fa fa-long-arrow-right"></i></Link>
                            </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Statistics1;