import React, { useState } from 'react';
import './login.css';
import localStorage from '../services/storageService';
import { Link } from 'react-router-dom';
import http from '../services/httpService';


const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');

    const validate = () => {
        // let isVaid = true;
        const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
        if (email.trim() === "") {
            setEmailError('Email is Required');
            return false;
        } else if (email.match(emailRegex) === null) {
            setEmailError('Please Enter Valid Email');
            return false;
        }
        else {
            setEmailError(null)
        }


        if (password.trim() === "") {
            setPassError('Password is Required');
            return false;
        } else if (password.trim().length < 8) {
            setPassError('Password minimum length should be 8');
            return false;
        }
        else {
            setPassError(null);
        }

    };

    const handleSubmit = async e => {
        console.log(process)
        e.preventDefault();
        const isValid = validate();
        const data = {
            email: email,
            password: password
        }

        if (isValid !== false) {
            await http.post('user/login', data).then(res => {
                if (res.status === 200) {
                    localStorage.set('token', res.data.data.token);
                    console.log(props)
                    console.log(props.state);
                    props.history.push('/openings');
                }
            })
        }
    };

    const handleChange = e => {
        if (e.name === 'email') {
            setEmail(e.value)
        }
        if (e.name === 'password') {
            setPassword(e.value);
        }
    };

    const inlinestyle = {
        backgroundColor: "#f1f1f1"
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <div className="container header-container" style={inlinestyle} >

                <span className="label-header">Login</span>


            </div>
            <div className="imgcontainer">
                <img src="/nagarro.png" alt="Avatar" className="avatar" />
            </div>
            <div className="container">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    name="email"
                    onChange={(e) => handleChange(e.target)}
                />
                {emailError &&
                    <div className="alert alert-danger">{emailError}</div>
                }

                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => handleChange(e.target)}

                />

                {passError &&
                    <div className="alert alert-danger">{passError}</div>
                }


            </div>

            <div className="container" style={inlinestyle} >
                <button type="submit" className="cancelbtn mt-2">
                    Login
            </button>
                <span className="psw">Don't have an Account? <Link to='/register'>Register here</Link></span>
            </div>



        </form>
    );


}

export default Login;