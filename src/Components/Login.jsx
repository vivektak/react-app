import React, { useState, useContext } from 'react';
import '../styles/login.css';
import localStorage from '../services/storageService';
import { Link } from 'react-router-dom';
import http from '../services/httpService';
import * as Constants from '../Constants/Constants';
import { userContext } from '../services/Context';
import Loader from 'react-loader-spinner';
import { checkEmailValidation, checkPasswordValidation, checkTypeValidation } from '../services/commonValidation.js'

import {
    CardContent,
    Card,
    CardActions,
    Button,
    TextField
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { success } from '../services/notificationService';

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [submitState, setSubmitState] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData } = useContext(userContext);

    const handleSubmit = async e => {
        setIsLoading(true);
        setSubmitState(true);
        const data = {
            email: email,
            password: password
        }

        // setSubmitState(true)
        await http.post('user/login', data).then(res => {
            if (res.status === 200) {
                setSubmitState(false);
                success(Constants.LOGGED_IN_SUCCESS)
                localStorage.set(Constants.TOKEN, res.data.data.token);
                setData(res.data.data)
                setIsLoading(false);
                if (res.data.data.role === 'admin' || res.data.data.role === 'superadmin') {
                    props.history.push('/openings')
                } else {
                    props.history.push('/dashboard')
                }

            }
        })
    };

    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    // const checkValidation = e => {


    //     if (emailError && passError) {
    //         setSubmitState(true)
    //     } else if (emailError === '' || passError === '') {

    //         setSubmitState(true)
    //     } else {
    //         setSubmitState(false);
    //     }
    // }

    // const handleKeyPress = e => {
    //     console.log(e)
    //     console.log(e.keyCode)
    //     if (e.keyCode === 13) {
    //         handleSubmit();
    //     }
    // }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8%"
            }}
        >
            <Link to="/Register" style={{
                position: "absolute",
                marginLeft: "200px",
                marginTop: "-17px"
            }}>
                <Button style={{
                    backgroundColor: "#E6A13A", height: "65px",
                    borderRadius: "50px"
                }}
                    title='Register'
                    size="small"
                    color="secondary"
                    variant="contained"
                >
                    <PersonAddIcon />
                </Button>
            </Link>
            <Card style={{ maxWidth: "400px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <img src="/nagarroBanner.png" alt="nagarro logo" />
                </div>
                <CardContent>
                    <TextField
                        id="standard-name"
                        label="Email"
                        name="email"
                        helperText={emailError}
                        fullWidth={true}
                        value={email}
                        error={emailError ? true : false}
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                        onBlur={e => {
                            setEmailError(checkEmailValidation(email));
                            //checkValidation(e)
                        }}
                        margin="normal"
                    ></TextField>
                    <TextField
                        id="standard-password"
                        label="Password"
                        type="password"
                        name="password"
                        fullWidth={true}
                        value={password}
                        error={passError ? true : false}
                        helperText={passError}
                        onKeyUp={e => { handleKeyUp(e) }}
                        onChange={e => {
                            setPassword(e.target.value.trim() === '' ? '' : e.target.value);
                        }}
                        onBlur={e => {
                            //setPassError(checkPasswordValidation(password));
                            //checkValidation(e)
                        }}
                    />
                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        style={{
                            backgroundColor: "#000",
                            borderRadius: "20px"
                        }}
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={emailError && password.length < 8 ? true : emailError === null && password.length >= 8 ? false : true}
                    >{Constants.LOG_IN}</Button>
                </CardActions>
            </Card>
            {isLoading ? <Loader
                style={{ position: 'absolute', top: '35%' }}
                type="ThreeDots"
                color="#000"
                height={50}
                width={50}
                timeout={3000} //3 secs

            /> : null}
        </div>
    );
}
