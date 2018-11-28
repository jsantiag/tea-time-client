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

    timerRedirect(teaType){
        this.props.dispatch(addTeaToUser(teaType));
        // return <Redirect to="/tea-timer" />;(this works only within render());
        this.props.history.push('/tea-timer'); 
    }

    render() {
        const teasList = this.props.teas.map((tea, i)=>
            <li key={i}>
                <span onClick={e => this.moreInfo(tea.id)}>{tea.teaType}</span>
                {tea.moreInfo && <div className="tempRec">{tea.tempRec}</div>}
                {tea.moreInfo && <div className="steepRec">{tea.steepTimeRec}</div>}
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

