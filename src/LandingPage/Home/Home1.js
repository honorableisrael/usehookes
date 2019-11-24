import React ,{ useReducer } from 'react';
import Axios from 'axios';

const nameInitialState = {}
const reducer = (state = nameInitialState, action) => {
    console.log(state)
    switch (action.type) {
        case 'updatefirstname':
            return {...state,firstname:action.payload}
        case 'lastname':
            return {...state,lastname:action.payload}
        case 'email':
            return state //do this later;
          default:
            return state
    }
}
const Home1 =()=>{
    const [state,dispatch] = useReducer(reducer,{ firstname:'', lastname:'', email:'' })
    console.log(state)
    const submitForm = (data)=>{
        // axios.post('')
        console.log(state)
    }
    
    return(
        <div>
            Firstname:<input type='text' value={state.firstname} onChange={(e)=>dispatch({
                type:'updatefirstname',
                payload:e.target.value
            })}/>
             Lastname:<input type='text' value={state.lastname} onChange={(e)=>dispatch({
                type:'lastname',
                payload:e.target.value
            })}/>
            <div><button onClick={(e)=>{
                e.preventDefault()
                submitForm()
            }}>Submit</button></div>
        </div>
    )
}

export default Home1