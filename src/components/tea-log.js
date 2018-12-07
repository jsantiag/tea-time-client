//ultimately just a form that brings with it the current tea attached to user 
//and adds vals to that tea
import React from 'react';
import {connect} from 'react-redux';
// import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';
// import {addLastTea} from '../actions/users';

export class TeaLog extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchTeas());  
    // this.props.dispatch(addLastTea()); 
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

export default (connect(mapStateToProps)(TeaLog));
