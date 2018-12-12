import React from 'react';
import {connect} from 'react-redux';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import '../css/header-bar.css'
import MoreInfo from './more-info'; 

export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        // Only render the log out button if we are logged in
        let logOutButton;
        let ShowMoreInfo;
        if (this.props.loggedIn) {
            logOutButton = (
                <button className="logOut" onClick={() => this.logOut()}>Log out</button>
            );
        }else{
            ShowMoreInfo=(<MoreInfo/>)
        }
        return (
            <header role="banner" className="header-bar">
                <div className="header-elements">
                 <h1>Tea Time</h1>{logOutButton}{ShowMoreInfo}
                 </div>
               
            </header>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(HeaderBar);