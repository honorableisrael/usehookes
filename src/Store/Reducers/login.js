//action returns an object
// const action = {
//     type:"users",
//     payload:'data'
// }

export default function(state={},action){
    switch(action.type){
        case 'users':
        return {...state,movies:action.payload}
        default : 
            return state;
    }
}