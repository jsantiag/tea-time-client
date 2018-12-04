import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas, showMoreInfo, addCustomToTeaList} from '../actions/teas';
import { addTeaToUser } from '../actions/users';

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
        console.log(this.input.value);
        this.props.dispatch(addCustomToTeaList(this.input.value));
        this.props.dispatch({type: 'resetCustom'}); 
    }

    render() {
        const teasList = this.props.teas.map((tea, i)=>
            <li key={i}>
                <span onClick={e => this.moreInfo(tea.id)}>{tea.teaType}</span>
                {tea.moreInfo && <div className="tempRec">{this.steepTempLookup(tea.tempRec)}</div>}
                {tea.moreInfo && <div className="steepRec">{this.steepRecLookup(tea.steepTimeRec)}</div>}
                {tea.moreInfo && <button onClick={e => this.timerRedirect(tea.teaType)}>select this tea</button>}
            </li>
       

        
          
    );
        return (
            <div className="tea-list-main">
                <div className="intro-username">
                    Welcome to tea time, {this.props.username}!
                </div>
                <div className="your-tea-list">
                    your tea list: 
                    <ul>{teasList}</ul>
                </div>
                <div className="create-new-tea">
                    <button onClick={e => this.handleCustomClick()}>create custom tea</button>
                </div>
                {this.props.customOn === true ? <div className="customInputForm">
                <form onSubmit={e => this.handleSaveCustom(e)}>
                    <label>Custom tea name:</label>
                    <input type='text' className="custom-tea-input" ref={input =>(this.input = input)}></input>
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

