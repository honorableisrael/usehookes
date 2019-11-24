import React, {useReducer } from 'react';

//stylesheet
import './Home.css';
import Home1 from './Home1';


const nameInitialState = {}
const reducer = (state = nameInitialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'increment':
            return parseInt(state +1)
        case 'decrement':
            return state > (0) ? parseInt(state -1):0
        default:
            return state
    }
}
 const Home =()=>{
  const [Age,dispatch] = useReducer(reducer,[0])
  console.log(dispatch)
 
  const increaseAge = () =>{
        dispatch({type:'increment'})
    }
     
  const decreaseAge = () =>{
    dispatch({type:'decrement'})
}
    return(
        <>
        <div>
            Hello World!
        </div>
        <div className="container">
                <button onClick={decreaseAge} >Decrease Value</button> {Age} <button onClick={increaseAge}>Increase Value</button> 
        </div>
        <Home1/>
        </>
    )
    
 }
   
    document.getElementById('disappear1').remove()
export default Home;