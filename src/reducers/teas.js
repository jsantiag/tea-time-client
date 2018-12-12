import {
  FETCH_TEAS_REQUEST, 
  FETCH_TEAS_SUCCESS,
  FETCH_TEAS_ERROR,
  SHOW_MORE_INFO 
} from '../actions/teas';
import {ADD_LASTTEA,LASTTEA_ERR,ADD_VALS_ERR, ADD_VALS, ADD_TIMER} from '../actions/users'; 

const initialState = {
  teas: [],
  loading: false,
  error: null,
  lastTea: null, 
  customOn: false, 
  vals: null,
  timer: null 
  // userTeas:[]
};

export default function teasReducer(state = initialState, action) {
  if (action.type === FETCH_TEAS_REQUEST) {
      return Object.assign({}, state, {
          loading: true,
          error: null
      });
  } else if (action.type === FETCH_TEAS_SUCCESS) {
    return Object.assign({}, state, {
        loading: false,
        error: null,
        teas: action.teas,        
    });
  } else if (action.type === FETCH_TEAS_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  } else if(action.type === SHOW_MORE_INFO){
    return Object.assign({}, state, {
      teas: state.teas.map(tea => {
        if(tea.id === action.teaId){
            return Object.assign({}, tea, {moreInfo: true});
        } else {
        return Object.assign({}, tea, {moreInfo: false}) ;
      }})
    });
  } else if(action.type === ADD_LASTTEA){
    return Object.assign({}, state, {
      lastTea: action.lastTea
    });
  }else if(action.type === LASTTEA_ERR){
    return Object.assign({},state,{
      lastTea: null, 
      error: action.err
    })
  }else if(action.type === 'setCustom'){
    return Object.assign({}, state, {
      customOn:true
    })
  }else if(action.type === 'resetCustom'){
    return Object.assign({}, state , {
      customOn:false
    })
  }else if(action.type === ADD_VALS_ERR){
    return Object.assign({}, state, {
      error: action.err
    })
  }else if(action.type === ADD_VALS){
    return Object.assign({}, state, {
      vals: action.vals
    })
  }else if(action.type === ADD_TIMER){
    return Object.assign({}, state, {
      timer: action.timer
    })
  }
  // }else if(action.type === MOST_RECENT){
  //   return Object.assign({},state, {
  //     userTeas: (state.auth.currentUser.teas).map(tea => {
  //         if(tea.teaType === action.teaType){
  //           return Object.assign({}, tea, {mostRecent:true});
  //           }else{
  //            return Object.assign({}, tea, {mostRecent:false})
  //           }
  //           })
  //   })
  // }
//want to take mostRecentTea by teaType and assign it to UserTeas

  return state;
}

