import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas, showMoreInfo} from '../actions/teas';
import { addTeaToUser } from '../actions/users';

export class TeaList extends React.Component {
    componentDidMount() {
      this.props.dispatch(fetchTeas());
    }

    moreInfo(teaId){
      this.props.dispatch(showMoreInfo(teaId));
    }

    steepRecLookup(steep){
        if (steep.length > 1){
            for(let i = 0; i < steep.length; i++){
                return `${steep[i]}-${steep[i+1]} minutes`; 
            }
        } else {
            return `${steep[0]} minutes`; 
        }

    }

    steepTempLookup(temp){
        if (temp.length > 1){
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
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        teas: state.teasReducer.teas 
        //moreinfo 
    };
};

export default requiresLogin()(connect(mapStateToProps)(TeaList));

