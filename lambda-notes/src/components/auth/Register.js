import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

class Register extends Component {
    state = {
        username: '',
        password: '',
        loading: false
    };

    inputChangeHandler = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    submitHandler = e => {
        e.preventDefault();
        this.setState({ loading: true });
        axios
        .post('https://lambda-notes-api.herokuapp.com/api/register', {
            username: this.state.username,
            password: this.state.password
            })
        .then(res => {
            //console.log('response', res)
            const {token} = res.data;
            localStorage.setItem('token', token);
            this.props.history.push('/notes');
        })
        .catch(err => {
            console.error('Axios error:', err);
        });
    }

  render() {
    return (
        <div className="login-page">
            <div className="outer-div">
            <div className="link-buttons">
                <Link to={`/`}>Login</Link>
                <Link to={`/signup`}>Sign Up</Link>
            </div>
            <div className="inner-div">
                <form className="form-div" onSubmit={this.submitHandler}>
                    <input
                    value={this.state.username}
                    onChange={this.inputChangeHandler}
                    type="text"
                    placeholder="Username"
                    name="username"
                    />
                    <input
                    value={this.state.password}
                    onChange={this.inputChangeHandler}
                    type="password"
                    placeholder="Password"
                    name="password"
                    />
                    <button type="submit">Create Account</button>
                </form>
            </div>
            </div>
            <p style={ this.state.loading ? 
                { textAlign: "center", marginTop: "20px" } : { display: "none" } }>
                Loading...
            </p>
        </div>
    );
  }

}

export default Register;
