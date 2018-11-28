import {
  FETCH_TEAS_REQUEST, 
  FETCH_TEAS_SUCCESS,
  FETCH_TEAS_ERROR,
  SHOW_MORE_INFO
} from '../actions/teas';
import {ADD_LASTTEA,LASTTEA_ERR} from '../actions/users'; 

const initialState = {
  teas: [],
  loading: false,
  error: null,
  lastTea: null
};

export default function teasReducer(state = initialState, action) {
  if (action.type === FETCH_TEAS_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === FETCH_TEAS_SUCCESS) {
      console.log(action.teas);
    return Object.assign({}, state, {
        loading: false,
        error: null,
        teas: action.teas,
        // lastTea: action.lastTea
        
    });
  } else if (action.type === FETCH_TEAS_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  } else if(action.type === SHOW_MORE_INFO){
    return Object.assign({}, state, {
      teas: state.teas.map(tea => {
          console.log(tea._id, action.teaId);
        if(tea.id === action.teaId){
            return Object.assign({}, tea, {moreInfo: true});
        } else {
        return Object.assign({}, tea, {moreInfo: false}) ;
      }})
    });
  } else if(action.type === ADD_LASTTEA){
    return Object.assign({}, state, {
      lastTea:action.lastTea.teaType
    });
  }else if(action.type === LASTTEA_ERR){
    return Object.assign({},state,{
      lastTea: null, 
      error: action.err
    })
  }


  return state;
}

//trigger success action, use that to populate currentTea prop in reducer 
