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

export const ADD_VALS ='ADD_VALS'; 
export const addVals = (vals) => ({
    type: ADD_VALS, 
    vals
})

export const ADD_VALS_ERR = 'ADD_VALS_ERR'; 
export const addValsErr = (err) => ({
    type: ADD_VALS_ERR,
    err
})

export const ADD_TIMER = 'ADD_TIMER'; 
export const addTimer = (timer) => ({
    type: ADD_TIMER, 
    timer
})

// export const MOST_RECENT = 'MOST_RECENT'; 
// export const mostRecent = (teaType) => ({
//     type: MOST_RECENT, 
//     teaType
// })




export const addValsToUserTea = (teaId,teaType,timer,log,spilled,rating) => (dispatch, getState) => {
    dispatch(addVals(teaId,teaType,timer,log,spilled,rating));
    const state = getState();
    return fetch(`${API_BASE_URL}/users/teas`, {
        method: 'PUT', 
        headers: {
            'content-type':'application/json'
        }, 
        body: JSON.stringify({_id:state.auth.currentUser._id, teaId,teaType,timer,log,spilled,rating })
    }).then(res => {
        if(res.ok){    
            console.log(res);
            console.log(this.state.vals);
            return res.json()
        } else {
            return dispatch(addValsErr(res))
        }
    }).catch(err=>dispatch(addValsErr(err)));
}



export const addTeaToUser = teaType => (dispatch, getState) => {
    const state = getState();
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


