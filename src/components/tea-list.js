import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas, showMoreInfo, addCustomToTeaList} from '../actions/teas';
import { addTeaToUser } from '../actions/users';
import './tea-list.css'

export class TeaList extends React.Component {

    componentDidMount() {
      this.props.dispatch(fetchTeas());
    }

    moreInfo(teaId){
 
      this.props.dispatch(showMoreInfo(teaId));
    }

    steepRecLookup(steep){
        if (steep[0] === undefined){
            return ``;
        }else if (steep.length > 1){
            for(let i = 0; i < steep.length; i++){
                return `${steep[i]}-${steep[i+1]} minutes`; 
            }
        } else {
            return `${steep[0]} minutes`; 
        }

    }

    steepTempLookup(temp){
        if (temp[0] === undefined){
            return ``;
        }else if (temp.length > 1){
            for(let i = 0; i < temp.length; i++){
                return `${temp[i]}-${temp[i+1]} degrees`; 
            }
        } else {
            return `${temp[0]} degrees`;
        }
    }

    timerRedirect(teaType){
        console.log(teaType);
        this.props.dispatch(addTeaToUser(teaType));
        // return <Redirect to="/tea-timer" />;(this works only within render());
        this.props.history.push('/tea-timer'); 
    }

    handleCustomClick(){
        console.log('handleCustomClick triggered');
        this.props.dispatch({type:'setCustom'});
    }

    handleSaveCustom(event){
        event.preventDefault();
        console.log(this.tea.value);
        console.log(this.steep.value);
        console.log(this.temp.value);
        this.props.dispatch(addCustomToTeaList(this.tea.value,this.temp.value,this.steep.value));
        this.props.dispatch({type: 'resetCustom'}); 
    }

    render() {
        const teasList = this.props.teas.map((tea, i)=>
            <li key={i}>
                <div className="list-element-container">
                <h3><span onClick={e => this.moreInfo(tea.id)}>{tea.teaType}</span></h3>
                {tea.moreInfo && <div className="tempRec"> Recommended steep temperature:{this.steepTempLookup(tea.tempRec)}</div>}
                {tea.moreInfo && <div className="steepRec">Recommended steep time:{this.steepRecLookup(tea.steepTimeRec)}</div>}
                {tea.moreInfo && <button className="tea-selector"onClick={e => this.timerRedirect(tea.teaType)}>select this tea</button>}
                </div>
             </li>
       

        
          
    );
        return (
            <div className="tea-list-main">
                <div className="intro-username">
                    <h3>Welcome to tea time, {this.props.username}!</h3>
                </div>
                <div className="your-tea-list">
                    <h3 className="tea-list-header">Select your tea</h3> 
                    <ul>{teasList}</ul>
                </div>
                <div className="create-new-tea">
                    {(this.props.customOn === true)?'':<button onClick={e => this.handleCustomClick()} className="custom-creator">create custom tea</button>}
                </div>
                {this.props.customOn === true ? <div className="customInputForm">
                <form className="custom-submission" onSubmit={e => this.handleSaveCustom(e)}>
                    <label>Custom tea name:</label>
                    <input type='text' className="custom-tea-input" required ref={input =>(this.tea = input) }></input>
                    <br/>
                    <label>Custom tea steep temp:</label>
                    <input type='text' className="custom-temp-input" ref={input =>(this.temp=input)}></input>
                    <br/>
                    <label>Custom tea steep time:</label>
                    <input type='text' className="custom-steep-input" ref={input =>(this.steep = input)}></input>
                    <br/>
                    <button type='submit' name= "submit" className="customSubmit">
                    Save Custom
                    </button>
                </form>
                </div> : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        teas: state.teasReducer.teas, 
        customOn: state.teasReducer.customOn
    };
};

export default requiresLogin()(connect(mapStateToProps)(TeaList));

