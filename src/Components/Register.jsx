import React, { useState } from 'react';
import '../styles/login.css'
import { Link } from 'react-router-dom';
import http from '../services/httpService';
import * as Constants from '../Constants/Constants';

import {
    CardContent,
    Card,
    CardActions,
    Button,
    TextField
} from "@material-ui/core";

import PersonIcon from "@material-ui/icons/Person";
import { success } from '../services/notificationService';
import { checkEmailValidation, checkPasswordValidation } from '../services/commonValidation';


const Register = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [buttonState, setButtonState] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setButtonState(true);
        const data = {
            email: email,
            password: password
        }

        await http.post('user/signup', data).then(res => {
            if (res.status === 200 || res.status === 201)
                success(Constants.REGISTER_SUCCESS);
            props.history.replace('/login');
        }).catch(error => {

        })
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8%"
            }}
        >
            <Link to="/login" style={{

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

                    <PersonIcon />
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
                        onBlur={e => { setEmailError(checkEmailValidation(e.target.value)) }}
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
                        onBlur={e => setPassError(checkPasswordValidation(e.target.value))}
                    />
                </CardContent>
                <CardActions style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        style={{
                            backgroundColor: "#000",
                            backgroundColor: "rgb(0, 0, 0)",
                            borderRadius: "20px"
                        }}
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={handleSubmit}
                    //disabled={buttonState}
                    >
                        {Constants.REGISTER}
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default Register;