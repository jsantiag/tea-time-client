import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';
import {addLastTea} from '../actions/users';
import { Redirect} from 'react-router-dom';

// const prettyMs = require('pretty-ms');

export class TeaTimer extends React.Component {
constructor() {
    super();
    this.state = {
      timerInput: null, 
      timeLeft: null, 
      spillCount:0
    };
    // this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    // this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchTeas());  
    this.props.dispatch(addLastTea()); 
  }

  onSubmit(event){
    event.preventDefault();
    console.log(this.input.value);
    this.setState({
      timeLeft: (parseInt(this.input.value)*60),
      timerInput:(parseInt(this.input.value))
    },() => this.startTimer())
  }
  
  startTimer(){
    console.log(this.state);
    let self = this; 
    setTimeout(function(){
      let seconds = self.state.timeLeft - 1;
      self.setState({
        timeLeft: seconds
      },function(){
        if(seconds >= 0){
          self.startTimer();
        }
      })
    },1000);
  }

  
 tempRecsLookUp(currentTeaType){
  let currentTea = this.props.teas.find(obj => obj.teaType === currentTeaType);
  let tempRec = currentTea.tempRec;
  if(tempRec[0] === undefined){
    return ``;
  }else if(tempRec.length > 1){
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
  if(steepRec[0] === undefined){
    return ``;
  }else if(steepRec.length > 1){
    for(let i=0; i<steepRec.length; i++){
      return `${steepRec[i]} - ${steepRec[i+1]} minutes`;
    }
  } else {
    return `${steepRec} minutes`;
  }
}

// spillCounter(){
// let self = this;
//  self.setState{
//    spillCount: self.state.spillCount + 1
//  }
// }

render(){
  if(this.state.timeLeft === 0){
    return <Redirect to="/tea-log" />;
  }

return (
     <div className="current-user-tea"> 
    
      <h2>Selected Tea: {(this.props.lastTea)? this.props.lastTea.lastTea.teaType : ''}</h2>
        <h3> Recommended Steep Temp: {((this.props.lastTea)? (this.tempRecsLookUp(this.props.lastTea.lastTea.teaType)) : 'no rec for this custom tea')} </h3>
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
         <div>{(this.state.timeLeft > 0)? this.state.timeLeft:''}</div>
         {(this.state.timeLeft > 0)? <div className='spill'>spills: {(this.state.timeLeft >0)? this.state.spillCounter: '0 spills'}</div>:''}
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


