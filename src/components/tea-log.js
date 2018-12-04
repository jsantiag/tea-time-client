//ultimately just a form that brings with it the current tea attached to user 
//and adds vals to that tea
import React from 'react';
import {connect} from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {fetchTeas} from '../actions/teas';
import {addLastTea} from '../actions/users';
import {required } from '../validators'; 

export class TeaLog extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTeas());  
    this.props.dispatch(addLastTea()); 
    console.log(this.props.lastTea.lastTea.teaType);
  }

render(){
  return(
    <div className="parent-wrapper">
      <div className="brew-info">
        <h2>Your brewed tea: {(this.props.lastTea)? this.props.lastTea.lastTea.teaType : ''}</h2>
        <h2>Your steep time: </h2>
        <h2>Your spill count:</h2>
        </div>
      <form className="log-form" onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} >
          <label><h2>Rate your brew:</h2></label>
          <Field 
          name="rate" 
          id="rate" 
          type="select" 
          component="select"
          validate = {[required]}>
            <option value="5">
              5 stars, best tea yet
            </option>
            <option value="4">
              4 stars, very good tea
            </option>
            <option value="3">
              3 stars, pretty good tea
            </option>
            <option value="2">
              2 stars, not great and not terrible
            </option>
            <option value="1">
              1 star, terrible tea
            </option>
          </Field>
          <label><h2>Notes about your brew:</h2></label>
          <Field name="description" type="text" id="description" component="input"/>
          <br></br>
        <button type="submit disabled={this.props.pristine || this.props.submitting}">Save your tea log</button>
      </form>
    </div>
  );

  }
}
  
const mapStateToProps = state => {
  // const {currentUser} = state.auth;
  return {
    teas: state.teasReducer.teas, 
    lastTea: state.teasReducer.lastTea
  };
};

export default reduxForm({form:'tea-log'})(connect(mapStateToProps)(TeaLog));
