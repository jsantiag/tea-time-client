import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {fetchTeas} from '../actions/teas';

export class TeaList extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchTeas());  
        console.log(this.props);

    }

    render() {
        console.log(this.props.teas);
        const teasList = this.props.teas.map((tea, i)=>
          <div className="tea-list-elements">
            <li key={i}>{tea.teaType}</li>
          </div>
          
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
    };
};

export default requiresLogin()(connect(mapStateToProps)(TeaList));