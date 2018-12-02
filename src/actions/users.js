import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const addTeaToUser = teaType => (dispatch, getState) => {
    const state = getState();
    console.log(state);
    return fetch(`${API_BASE_URL}/users/teas`, {
        method: 'POST',
        headers: {
            'content-type':'application/json'
        }, 
        body: JSON.stringify({_id:state.auth.currentUser._id, teaType})
    }).then(res => {
     if(res.ok){
         return res.json()
     } else {
         return dispatch(lastTeaErr(res))
     } 
    })
    .then((res) => { dispatch(addLastTea(res))
    })
    .catch(err => dispatch(lastTeaErr(err)))
    
}; 

export const ADD_LASTTEA = 'ADD_LASTTEA'; 
export const addLastTea = (lastTea) => ({
    type: ADD_LASTTEA, 
    lastTea
});

export const LASTTEA_ERR = 'LASTTEA_ERR';
const lastTeaErr = (err) => ({
    type: LASTTEA_ERR,
    err
});


export const addValsToUserTea = (teaId,teaType,log,spilled,rating,timer) => (dispatch, getState) => {
    const state = getState();
    console.log(state);
    return fetch(`${API_BASE_URL}/users/teas`, {
        method: 'PUT', 
        headers: {
            'content-type':'application/json'
        }, 
        body: JSON.stringify({_id:state.auth.currentUser._id, teaId, teaType, log, spilled, rating, timer})
    }) 
};



// export const ADD_CURRENT_TEA = 'ADD_CURRENT_TEA'; 
// export const addCurrentTea = (teaId) => ({
//     type: ADD_CURRENT_TEA,
//     teaId
// }); 

// export const FETCH_USER_REQUEST  = 'FETCH_USER_REQUEST'; 
// export const fetchUserRequest = () => ({
//     type: FETCH_USER_REQUEST
// });

// export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
// export const fetchUserSuccess = (user) => ({
//     type: FETCH_USER_SUCCESS,
//     user
// });

// export const FETCH_USER_ERROR = 'FETCH_USER_SUCCESS';
// export const fetchUserError = (err) => ({
//     type: FETCH_USER_ERROR,
//     err
// });




// export const fetchUser = () => (dispatch, getState) => {
//     const state = getState();
//     dispatch(fetchUserRequest());
//     return fetch(`${API_BASE_URL}/users/:id`,{
//         method: 'GET',
//         headers: {
//             'content-type':'application/json'
//         }, 
//         body: JSON.stringify({id:state.auth.currentUser._id})
        
//     })
// }