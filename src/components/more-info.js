import React from 'react'; 
import '../css/more-info.css';

export class MoreInfo extends React.Component {
  constructor(props){
    super(props); 

    this.state = {
      moreInfoOn: false
    }; 
  }; 

  handleInfo(e){
    e.preventDefault(); 
    this.setState({
      moreInfoOn: !this.state.moreInfoOn 
    })
  }

  render(){

  return (   
    
    <div className="more-info-container">
    {(this.state.moreInfoOn === false)? <button className="more-info" onClick={e => this.handleInfo(e)}>wait, what's tea time?</button>:
    <button className="close description" onClick={e=>this.handleInfo(e)}>close description</button>}
    {(this.state.moreInfoOn === true)?
    <div className="text-container-div"><p className='more-info-text'>
      Tea-Time is a tool for those in pursuit of the perfect cup of tea.
      <br/>
      With Tea-Time you can set a timer to steep your tea and after your
      tea is ready you can rate your brew.
      <br/>
      Info from your last brew will appear upon new selection of a tea of
      the same type.
      <br/>
      While your tea steeps and the timer is running your only challenge 
      is to use that time to disconnect from all your responsibilities
      and internet temptations by not leaving the Tea-Time window.
      <br/>
      If you leave your window you'll spill your tea!
      <br/>
      So take a break and enjoy your you-time with Tea-Time!
    </p></div>:''}
    </div>
  )
  } 
}


export default (MoreInfo);