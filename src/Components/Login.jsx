import React, { useState, useContext } from 'react';
import '../styles/login.css';
import localStorage from '../services/storageService';
import { Link } from 'react-router-dom';
import http from '../services/httpService';
//import { toast } from 'react-toastify';
import * as Constants from '../Constants/Constants';
import { userContext } from '../services/Context';

import {
    CardContent,
    Card,
    CardActions,
    Button,
    TextField
} from "@material-ui/core";
import Alert from "react-s-alert";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
//import PersonIcon from "@material-ui/icons/Person";
//import nagarroBanner from "../../assets/nagarroBanner.png";



export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [buttonState, setButtonState] = useState(false);

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
        setButtonState(true);
        const isValid = validate();
        const data = {
            email: email,
            password: password
        }

        if (isValid !== false) {
            await http.post('user/login', data).then(res => {
                if (res.status === 200) {
                    //toast.success(Constants.LOGGED_IN_SUCCESS);
                    setButtonState(false);
                    Alert.success(res.data.message, {
                        position: "top-right",
                        effect: "bouncyflip",
                        onShow: function () {
                            console.log("aye!");
                        },
                        beep: false,
                        timeout: 2000
                    });

                    localStorage.set(Constants.TOKEN, res.data.data.token);
                    setData(res.data.data)
                    props.history.push('/openings');
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

    // const inlinestyle = {
    //     backgroundColor: "#f1f1f1"
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
                    onClick={handleSubmit}

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
                            setEmailError(false);
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
                            setPassError(false);
                        }}
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
                        disabled={buttonState}
                    >Login</Button>
                </CardActions>
            </Card>
        </div>
        // <form onSubmit={(e) => handleSubmit(e)} >
        //     <div className="container header-container" style={inlinestyle} >
        //         <span className="label-header">{Constants.LOG_IN}</span>
        //     </div>
        //     <div className="imgcontainer">
        //         <img src="/nagarro.png" alt="Avatar" className="avatar" />
        //     </div>
        //     <div className="container">
        //         <label htmlFor={Constants.EMAIL.toLowerCase()}>Email address</label>
        //         <input
        //             className="form-control"
        //             id={Constants.EMAIL.toLowerCase()}
        //             aria-describedby="emailHelp"
        //             placeholder="Enter email"
        //             value={email}
        //             name={Constants.EMAIL.toLowerCase()}
        //             onBlur={() => validate()}
        //             onChange={(e) => handleChange(e.target)}
        //         />
        //         {emailError &&
        //             <div className="alert alert-danger">{emailError}</div>
        //         }

        //         <label htmlFor={Constants.PASSWORD.toLowerCase()}>Password</label>
        //         <input
        //             className="form-control"
        //             id={Constants.PASSWORD.toLowerCase()}
        //             name={Constants.PASSWORD.toLowerCase()}
        //             placeholder={Constants.PASSWORD}
        //             value={password}
        //             onBlur={() => validate()}
        //             onChange={(e) => handleChange(e.target)}

        //         />

        //         {passError &&
        //             <div className="alert alert-danger">{passError}</div>
        //         }


        //     </div>

        //     <div className="container" style={inlinestyle} >
        //         <button type="submit" className="cancelbtn mt-2">
        //             {Constants.LOG_IN}
        //         </button>
        //         <span className="psw">{Constants.DONT_HAVE_AN_ACCOUNT} <Link to='/register'>{Constants.REGISTER} {Constants.HERE}</Link></span>
        //     </div>



        // </form>



    );


}

//export default   Login, userContext;