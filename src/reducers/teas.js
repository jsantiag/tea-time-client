import {
  FETCH_TEAS_REQUEST, 
  FETCH_TEAS_SUCCESS,
  FETCH_TEAS_ERROR
} from '../actions/teas';

const initialState = {
  teas: [],
  loading: false,
  error: null
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
        teas: action.teas
    });
  } else if (action.type === FETCH_TEAS_ERROR) {
      return Object.assign({}, state, {
          error: action.error
      });
  }
  return state;
}