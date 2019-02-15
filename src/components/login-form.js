import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {login} from '../actions/auth';
import {required, nonEmpty} from '../validators';
import '../css/login-form.css'

export class LoginForm extends React.Component {
    onSubmit(values) {
        return this.props.dispatch(login(values.username, values.password));
    }

    render() {
        let error;
        if (this.props.error) {
            error = (
                <div className="form-error" aria-live="polite">
                    {this.props.error}
                </div>
            );
        }
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div className="login-fields-container">
                {error}
                <div className="username-container">
                <label htmlFor="username">Username:</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    placeholder="username"
                    validate={[required, nonEmpty]}
                />
                </div>
                <div className="password-container">
                <label htmlFor="password">Password:</label>
                <Field
                    component={Input}
                    placeholder="password"
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, nonEmpty]}
                />
                </div>
                <div className="demo account"><p>Use this demo account to try out the app: username:greentea, password:bestteaever</p></div>
                <button disabled={this.props.pristine || this.props.submitting}>
                    Log in
                </button>
                </div>
            </form>
        );
    }
}

export default reduxForm({
    form: 'login',
    onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);