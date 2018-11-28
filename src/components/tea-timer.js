import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';
// import {fetchUser} from '../actions/users';

export class TeaTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTimerVal: '', 
      spillCount:''
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchTeas());
    // this.props.dispatch(lastTeaReturn());
    
  }


  // updateInputTimerVal(evt) {
  //     this.setState({
  //       inputTimerVal: evt.target.value
  // });
 

  // spillCounter(){
  //window.onblur 
  // }

render(){
  console.log(this.props.lastTea);
  // console.log(this.props.lastTea.teaType);
 

return (
     <div className="current-user-tea">
      <h2>Selected Tea: {this.props.lastTea}</h2>
        {/* <h2> Selected Tea:{(this.props.lastTea === null)?  '' : `${this.props.lastTea.teaType}`}</h2> */}
        {/* <h3> Recommended Steep Temp: {currentUserTea.teaType} </h3> */}
        {/* <h3> Recommended Steep Time: {currentUserTea.teaType} </h3> */}
     </div>

      // <div className="timer-input-field">
      //   <input onChange={this.state.inputTimerVal}/>
      //   <button type='submit' onSubmit={evt => this.updateInputTimerVal(evt)}>set timer</button>
      // </div> 
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

export default requiresLogin()(connect(mapStateToProps)(TeaTimer));


