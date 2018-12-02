import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';
import {addLastTea} from '../actions/users';
const prettyMs = require('pretty-ms');

export class TeaTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTimerVal: 0, 
      spillCount:0, 
      timerOn: false,
      timerStart: 0
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchTeas());  
    this.props.dispatch(addLastTea());  
  }

  onSubmit(event) {
    event.preventDefault();
    const value = this.input.value;
    this.setState({inputTimerVal:value});
    this.startTimer();
    console.log(this.state);
  }

  startTimer() {
    this.setState({
      inputTimerVal: this.state.inputTimerVal,
      timerStart: Date.now() - this.state.inputTimerVal,
      timerOn: true
    })
   console.log(prettyMs(this.state.inputTimerVal)); 
   console.log(prettyMs(this.state.timerStart));
  }
  

 tempRecsLookUp(currentTeaType){
  let currentTea = this.props.teas.find(obj => obj.teaType === currentTeaType);
  let tempRec = currentTea.tempRec;
  if(tempRec.length > 1){
    for (let i=0; i<tempRec.length; i++){
      return  `${tempRec[i]} - ${tempRec[i+1]} degrees`;
    } 
  } else {
    return `${tempRec} degrees`;
  }
}

steepRecsLookUp(currentTeaType){
  let currentTea = this.props.teas.find(tea => tea.teaType === currentTeaType);
  let steepRec = currentTea.steepTimeRec;
  if(steepRec.length > 1){
    for(let i=0; i<steepRec.length; i++){
      return `${steepRec[i]} - ${steepRec[i+1]} minutes`;
    }
  } else {
    return `${steepRec} minutes`;
  }
}

  // spillCounter(){
  //window.onblur 
  // }

render(){
return (
     <div className="current-user-tea">
      <h2>Selected Tea: {(this.props.lastTea)? this.props.lastTea.lastTea.teaType : ''}</h2>
        <h3> Recommended Steep Temp: {((this.props.lastTea)? (this.tempRecsLookUp(this.props.lastTea.lastTea.teaType)) : '')} </h3>
        <h3> Recommended Steep Time:  {((this.props.lastTea)? (this.steepRecsLookUp(this.props.lastTea.lastTea.teaType)) : '')} </h3>
        <form onSubmit={e => this.onSubmit(e)}>
        <input
          type="number"
          name="steepTimer"
          id="steepTimer"
          className="timer"
          min=".01"
          max="100"
          autoComplete="off"
          aria-labelledby="feedback"
          ref={input => (this.input = input)}
          required
          step='.01'
        />
          <button 
          type="submit"
          name="submit"
          id="guessButton" 
          className="button">start timer</button>
       
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

export default requiresLogin()(connect(mapStateToProps)(TeaTimer));


