import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import './landing-page.css';
import LoginForm from './login-form';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's tealist
    if (props.loggedIn) {
        return <Redirect to="/tea-list" />;
    }

    return (
        <div className="home">
            <h2>Welcome to Tea Time!</h2>
            <LoginForm />
            <div className="register-container">
            <Link to="/register">Register</Link>
            </div>
            <div className="tea-time-image">
                <img src='https://lh3.googleusercontent.com/JRO4dmIJOGr4ojCTIcrdS38xBHGjsieD4VgB97Lu1lEK3akydta1kKwqnX0L_EXie1BOCBPteKAftpKJZSaZRuye9iF2v1RLqmK1m5zfrBRbbuXYryAWwdIm3IulOa6K30yDVY_TXw=w2400' alt="digital drawing of full cup of tea" />
            </div>
        </div>
        
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);