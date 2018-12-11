import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';
import {addLastTea, addValsToUserTea, addTimer} from '../actions/users';
import PageVisibility from 'react-page-visibility';
import '../css/tea-timer.css';
import spilledPic from '../imgFiles/spilled';
import unspilledPic from '../imgFiles/unspilled';
import TeaLogForm from './log-form';

export class TeaTimer extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      timeLeft: null, 
      timerInputField:true
    };
    this.startTimer = this.startTimer.bind(this);
    this.setTimeOutFunc = null; 
    this._isMounted = false; 
  }

  componentDidMount() {
    this.props.dispatch(fetchTeas());  
    this.props.dispatch(addLastTea()); 
  }

  
  onSubmit(event){
    event.preventDefault();
    let timer = (parseFloat(this.input.value)*60);
    this.props.dispatch(addTimer(timer));
    this.setState({
      timeLeft: (parseFloat(this.input.value)*60),
      timerInputField:false
    },() => this.startTimer())
  }

  
  startTimer(){
    let self = this; 
    self.setTimeOutFunc = setTimeout(()=>{
      let seconds = self.state.timeLeft - 1;
      self.setState({
        timeLeft: seconds
      },(()=>{
        if(seconds >= 0){
          self.startTimer();
        }else if (seconds === 0 && self.state.timerInputField === false){
        clearTimeout(self.setTimeOutFunc);
        } 
      }))
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

handlesubmitVals(e){
  e.preventDefault();
  if (this.props.lastTea){
  let teaId = this.props.lastTea.lastTea._id; 
  let teaType = this.props.lastTea.lastTea.teaType;
  let timer = this.props.timer; 
  let log = e.target.tea_comments.value;
  let spilled = this.state.spilled; 
  let rating= e.target.ratingVal.value;
  this.props.dispatch(addValsToUserTea(teaId, teaType, timer, log, spilled, rating)); 
  this.props.history.push('/tea-list'); 
  };
}
submitVals(){
  if(this.props.lastTea){
    let teaId = this.props.lastTea.lastTea._id; 
    let teaType = this.props.lastTea.lastTea.teatype; 
    let timer = this.props.timer; 

    this.props.dispatch(addValsToUserTea(teaId, teaType, timer));
  }
}

handleVisibilityChange= () => {
  this.setState({
    spilled: true
  });
}

componentDidUpdate(){
   if( this.state.timeLeft === 0){
    this.submitVals();
  clearTimeout(this.setTimeOutFunc);
  }
}

render(){
 

return (
    <PageVisibility onChange={this.handleVisibilityChange}>
     <div className="current-user-tea">
      <h2>Selected Tea: {(this.props.lastTea)?
         this.props.lastTea.lastTea.teaType : ''}</h2>
        <h3> Recommended Steep Temp: {((this.props.lastTea)?
           (this.tempRecsLookUp(this.props.lastTea.lastTea.teaType)) : 'no temp rec for this tea')} </h3>
        <h3> Recommended Steep Time:  {((this.props.lastTea)? 
          (this.steepRecsLookUp(this.props.lastTea.lastTea.teaType)) : 'no steep rec for this tea')} </h3>
         {(this.state.timeLeft === 0 && this.state.timer !== null)?
          '' :<form onSubmit={e => this.onSubmit(e)}>
          {(this.state.timerInputField === false)? '' :
         <div> <input
            type="number"
            name="steepTimer"
            id="steepTimer"
            className="timer"
            min=".1"
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
            className="button">start timer</button> </div>}
          </form>}
          {(this.state.timeLeft === 0 && this.state.timerInputField === false && this.state.spilled === true)?
             <p className="enjoy-your-tea-spill">You spilled your tea earlier, but your real brew is all done now!
                Enjoy your tea and better luck with disconnecting during your steep break next time! :) </p>
                : ''}

        {(this.state.timeLeft === 0 && this.state.timerInputField === false)? <div className="log-container"><TeaLogForm handleSubmit={(e) => this.handlesubmitVals(e)}  /></div>:''}
         <div>{(this.state.timeLeft > 0)? 
         <h3>Time Left: {this.state.timeLeft}</h3>:''}
         </div>
         {(this.state.timeLeft > 0 && this.state.spilled === true)?
           <div className='spill-image'><p>Oh no! You spilled your tea!</p>
           <img src={spilledPic} alt="broody digital drawing of spilled cup of tea"/>
           </div>:
           <div className="unspilled-tea"><img alt="full and upright cup of tea, good job!"src={unspilledPic} />
           </div>}
      </div>
    </PageVisibility>
    );
  }

}

const mapStateToProps = state => {
  // const {currentUser} = state.auth;
  return {
    teas: state.teasReducer.teas, 
    lastTea: state.teasReducer.lastTea, 
    vals: state.teasReducer.vals,
    timer: state.teasReducer.timer
  };
};

const mapDispatchToProps = dispatch => ({
  addValsToUserTea: (teaId, teaType, spilled, timer) => dispatch(addValsToUserTea(teaId, teaType, spilled, timer)),
  addTimer:(timer) => dispatch(addTimer(timer))
});



export default requiresLogin()(connect(mapStateToProps, mapDispatchToProps)(TeaTimer));

