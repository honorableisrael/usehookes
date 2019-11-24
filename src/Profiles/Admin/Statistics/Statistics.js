import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Statistics.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import pramoprologo from '../../../assets/pramopro4.png';
import {API} from '../../../assets/config';
import axios from 'axios'

class Statistics extends Component {

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
        const token = loggedIn?JSON.parse(loggedIn).token:''
        console.log(userdata.user.id)
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
        axios.get(`https://staging.pramopro.com/api/v1/statistics/trade`)
        .then(res=>{
            console.log(res)
            this.setState({
                productStats:res.data?res.data:null
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
        const number = 0
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
                            <div className="secondstatsbox">
                                <div className="ourtext">
                                    TOTAL TRADERS
                                </div>
                                <div className="ournumbers">
                                    {productStats?productStats.totalTraders.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                    </div>                            
                                    <div className="totalusersnumber">
                                            {productStats?productStats.totalUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers"> Total Users</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtext">
                                    TOTAL UNITS PURCHASED
                                </div>
                                <div className="ournumbers">
                                    {productStats?productStats.totalUnitsPurchased.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                    </div>                            
                                    <div className="totalusersnumber">
                                            {productStats?productStats.totalProjects.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers"> Total Projects</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtext">
                                    TOTAL UNITS REMAINING
                                </div>
                                <div className="ournumbers">
                                    {productStats?productStats.totalUnitsRemaining.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                    </div>                            
                                    <div className="totalusersnumber">
                                            {productStats?productStats.totalProjects.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers"> Total Projects</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtextname">
                                    {productStats?productStats.valuePerProduct[0].name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                                <div className="ournumbers">
                                    {productStats?productStats.valuePerProduct[0].totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Litres</span>
                                    </div>
                                                      
                                    <div className="totalusersnumber borderlineclass">
                                            {productStats?productStats.unitsPerProduct[0].units.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers"> Units</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtextname ">
                                {productStats?productStats.valuePerProduct[1].name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                                <div className="ournumbers">
                                {productStats?productStats.valuePerProduct[1].totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Metric Tonnes</span>
                                    </div>                            
                                    <div className="totalusersnumber borderlineclass">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers">Units</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtextname">
                                {productStats?productStats.valuePerProduct[2].name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                                <div className="ournumbers">
                                {productStats?productStats.valuePerProduct[2].totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Litres</span>
                                    </div>                            
                                    <div className="totalusersnumber borderlineclass">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Units</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtextname">
                                {productStats?productStats.valuePerProduct[3].name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                                <div className="ournumbers">
                                {productStats?productStats.valuePerProduct[3].totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Litres</span>
                                    </div>                            
                                    <div className="totalusersnumber borderlineclass">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Units</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox">
                                <div className="ourtextname">
                                {productStats?productStats.valuePerProduct[4].name.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''}
                                </div>
                                <div className="ournumbers">
                                    {productStats?productStats.valuePerProduct[4].totalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):''} <span className="totalusers">Litres</span>
                                    </div>                            
                                    <div className="totalusersnumber borderlineclass">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Units</span>
                                    </div>
                            </div>
                            <div className="secondstatsbox2">
                                <div className="ourtextname">
                                    Invisible block
                                </div>
                                <div className="ournumbers">
                                    {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers">Litres</span>
                                    </div>                            
                                    <div className="totalusersnumber borderlineclass">
                                            {number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} <span className="totalusers"> Units</span>
                                    </div>
                            </div>
                    </Row>
                    <Row>
                    <div className="prevclass">
                    <Link to='/admin-stats-next' style={{color:'#444444'}}><i className="fa fa-long-arrow-left"></i> Previous</Link>
                            </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Statistics;