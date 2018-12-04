import { API_BASE_URL } from '../config';

export const FETCH_TEAS_REQUEST = 'FETCH_TEAS_REQUEST';
export const fetchTeasRequest = () => ({
  type: FETCH_TEAS_REQUEST
});

export const FETCH_TEAS_SUCCESS = 'FETCH_TEAS_SUCCESS';
export const fetchTeasSuccess = (teas) => ({
  type: FETCH_TEAS_SUCCESS,
  teas
});
export const FETCH_TEAS_ERROR = 'FETCH_TEAS_ERROR';
export const fetchTeasError = (err) => ({
  type: FETCH_TEAS_ERROR,
  err
});
export const SHOW_MORE_INFO = 'SHOW_MORE_INFO'
export const showMoreInfo = (teaId) => (
  {
    type: SHOW_MORE_INFO,
    teaId
  });

export const POST_CUSTOM_TEA = 'POST_CUSTOM_TEA'; 
export const postCustomTea = (customTea) => ({
  type: POST_CUSTOM_TEA,
  customTea
})

export const CUSTOM_TEA_ERR = 'CUSTOM_TEA_ERR';
const customTeaErr = (err) => ({
    type: CUSTOM_TEA_ERR,
    err
});


export const fetchTeas = () => (dispatch) => {
  dispatch(fetchTeasRequest());
  return fetch(`${API_BASE_URL}/teas`)
      .then(res => res.json())
      .then(teas => dispatch(fetchTeasSuccess(teas)))
      .catch(err => dispatch(fetchTeasError(err)));
};

export const addCustomToTeaList = (teaType) => (dispatch) => {
  dispatch(postCustomTea(teaType)); 
  return fetch(`${API_BASE_URL}/teas`, {
    method: 'POST',
    headers: {
      'content-type':'application/json'
    }, 
    body: JSON.stringify({teaType})
  }).then(res => {
    if(res.ok){
      return res.json()
    }else{
      return dispatch(customTeaErr(res))
    }
  })
  .then((res) => dispatch(fetchTeas(res)))
}