import{
  SET_TIMER, 
  SET_TIME_LEFT
}from '../actions/users'; 


const initialState = {
  timerInput: null, 
  timeLeft: null
}

export default function timerReducer(state = initialState, action){
  if(action.type === SET_TIMER) {
    return Object.assign({}, state, {
      timerInput: action.timerInput
    });
  } else if (action.type === SET_TIME_LEFT ){
    console.log(action.timeLeft);
    return Object.assign({}, state, {
      timeLeft: action.timeLeft
    });
  }

  return state; 
}