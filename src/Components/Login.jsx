import React, { useState, useContext } from 'react';
import '../styles/login.css';
import localStorage from '../services/storageService';
import { Link } from 'react-router-dom';
import http from '../services/httpService';
import * as Constants from '../Constants/Constants';
import { userContext } from '../services/Context';

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

    const { data, setData } = useContext(userContext);

    const handleSubmit = async e => {
        //setSubmitState(true);
        const data = {
            email: email,
            password: password
        }

        await http.post('user/login', data).then(res => {
            if (res.status === 200) {
                //setSubmitState(false);
                success(Constants.LOGGED_IN_SUCCESS)
                localStorage.set(Constants.TOKEN, res.data.data.token);
                setData(res.data.data)
                props.history.push('/openings');
            }
        })
    };

    // const checkValidation = e => {
    //     if (checkEmailValidation(e.target.value) !== null) {
    //         console.log('email')
    //         setSubmitState(true);
    //     } else if (checkPasswordValidation(e.target.value) !== null) {
    //         console.log('password')

    //         setSubmitState(true);
    //     } else {
    //         setSubmitState(false)
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
                            setEmailError(checkEmailValidation(e.target.value));
                            // checkValidation(e)
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
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                        onBlur={e => {
                            setPassError(checkPasswordValidation(e.target.value));
                            //  checkValidation(e)
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
                    //disabled={submitState}
                    >{Constants.LOG_IN}</Button>
                </CardActions>
            </Card>
        </div>
    );
}
