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

export const LAST_TEA_RETURN = 'LAST_TEA_RETURN'
export const lastTeaReturn = (lastTea) => (
  {
    type: LAST_TEA_RETURN,
    lastTea
  }
);

export const fetchTeas = () => (dispatch) => {
  dispatch(fetchTeasRequest());
  return fetch(`${API_BASE_URL}/teas`)
      .then(res => res.json())
      .then(teas => dispatch(fetchTeasSuccess(teas)))
      .catch(err => dispatch(fetchTeasError(err)));
};