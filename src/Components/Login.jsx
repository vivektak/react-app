import React, { useState, useContext } from 'react';
import '../styles/login.css';
import localStorage from '../services/storageService';
import { Link } from 'react-router-dom';
import http from '../services/httpService';
import { toast } from 'react-toastify';
import * as Constants from '../Constants/Constants';
import { userContext } from '../services/Context';



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    //const [loginData, setloginData] = useState({});

    const { data, setData } = useContext(userContext);

    console.log(data);

    const validate = () => {
        const emailRegex = "[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}";
        if (email.trim() === "") {
            setEmailError(Constants.EMAIL_REQUIRE);
            return false;
        } else if (email.match(emailRegex) === null) {
            setEmailError(Constants.INVALID_EMAIL);
            return false;
        }
        else {
            setEmailError(null)
        }


        if (password.trim() === "") {
            setPassError(Constants.PASSWORD_REQUIRE);
            return false;
        } else if (password.trim().length < 8) {
            setPassError(Constants.INVALID_PASSWORD);
            return false;
        }
        else {
            setPassError(null);
        }

    };

    const handleSubmit = async e => {
        e.preventDefault();
        const isValid = validate();
        const data = {
            email: email,
            password: password
        }

        if (isValid !== false) {
            await http.post('user/login', data).then(res => {
                if (res.status === 200) {
                    toast.success(Constants.LOGGED_IN_SUCCESS);
                    localStorage.set(Constants.TOKEN, res.data.data.token);
                    props.history.push('/openings');
                    setData(res.data.data)
                }
            })
        }
    };

    const handleChange = e => {
        if (e.name === Constants.EMAIL.toLowerCase()) {
            setEmail(e.value)
        }
        if (e.name === Constants.PASSWORD.toLowerCase()) {
            setPassword(e.value);
        }
    };

    const inlinestyle = {
        backgroundColor: "#f1f1f1"
    }



    return (
        <form onSubmit={(e) => handleSubmit(e)} >
            <div className="container header-container" style={inlinestyle} >
                <span className="label-header">{Constants.LOG_IN}</span>
            </div>
            <div className="imgcontainer">
                <img src="/nagarro.png" alt="Avatar" className="avatar" />
            </div>
            <div className="container">
                <label htmlFor={Constants.EMAIL.toLowerCase()}>Email address</label>
                <input
                    className="form-control"
                    id={Constants.EMAIL.toLowerCase()}
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={email}
                    name={Constants.EMAIL.toLowerCase()}
                    onBlur={() => validate()}
                    onChange={(e) => handleChange(e.target)}
                />
                {emailError &&
                    <div className="alert alert-danger">{emailError}</div>
                }

                <label htmlFor={Constants.PASSWORD.toLowerCase()}>Password</label>
                <input
                    className="form-control"
                    id={Constants.PASSWORD.toLowerCase()}
                    name={Constants.PASSWORD.toLowerCase()}
                    placeholder={Constants.PASSWORD}
                    value={password}
                    onBlur={() => validate()}
                    onChange={(e) => handleChange(e.target)}

                />

                {passError &&
                    <div className="alert alert-danger">{passError}</div>
                }


            </div>

            <div className="container" style={inlinestyle} >
                <button type="submit" className="cancelbtn mt-2">
                    {Constants.LOG_IN}
                </button>
                <span className="psw">{Constants.DONT_HAVE_AN_ACCOUNT} <Link to='/register'>{Constants.REGISTER} {Constants.HERE}</Link></span>
            </div>



        </form>

    );


}

//export default   Login, userContext;