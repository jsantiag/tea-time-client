import React from 'react'; 
// import {addFormVals, addValsToUserTea } from '../actions/users'; 
// import {connect} from 'react-redux';
// import requiresLogin from './requires-login';


export default function (props){

  return (
    <div className="log-form-wrapper"> 
    <form className="log-form" onSubmit={e => props.handleSubmit(e)}>
        <label><h2>Rate your brew with a number 1-4:</h2></label>
        <input className="rating-val" type='number' required name='ratingVal'></input>
        <label><h2>Notes about your brew:</h2></label>
        <textarea id="tea_comments" name="tea_comments" rows="10" cols="35">
        </textarea>
        <br></br>
        <button type="submit">Save your tea log</button>
      </form> 
    </div>
    );
  }


