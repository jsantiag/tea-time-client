import React from 'react'; 

export class TeaLogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      log:null,
      rating:null
    }
  }
  
    handleSubmit(){
      this.setState({
        log:this.note.value,
        rating:this.rating.value
      })
    }

  render(){

  

  return (
    <div className="log-form-wrapper"> 
    <form className="log-form" onSubmit={e => this.handlesubmit()}>
        <label><h2>Rate your brew with a number 1-4:</h2></label>
        <input className="rating-val" type='number' required ref={input => (this.rating = input) }></input>
        <label><h2>Notes about your brew:</h2></label>
        <textarea id="tea_comments" name="tea_comments" rows="10" cols="35" ref={input => (this.note = input)}>
        </textarea>
        <br></br>
        <button type="submit">Save your tea log</button>
      </form> 
    </div>
    );
  }
  }

export default(TeaLogForm);

