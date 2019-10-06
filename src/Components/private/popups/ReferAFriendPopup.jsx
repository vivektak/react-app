import React, { useState } from 'react';
import '../../../styles/popup.css';
import '../../../styles/login.css';
import * as Constants from '../../../Constants/Constants';


import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@material-ui/core";
import { toBase64 } from '../../../services/commonHandler';
import { checkNameValidation, checkEmailValidation, checkMobileValidation } from '../../../services/commonValidation';


const ReferAFriendPopup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [resume, setResume] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    const handleSubmit = () => {
        console.log(props)
        let data = {
            jobId: props.data._id,
            name,
            email,
            mobile: mobileNumber,
            resume

        }
        props.handleSubmit(data);
    }

    const onChange = async (e) => {
        console.log(e);
        console.log(e.target.files[0]);
        const resume = await toBase64(e.target.files[0]);
        setResume(resume);
    }

    return (
        <React.Fragment><DialogTitle id="alert-dialog-slide-title">Refer Friend</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Name"
                    name="name"
                    helperText={nameError}
                    fullWidth={true}
                    value={name}
                    error={nameError ? true : false}
                    onChange={e => {
                        setName(e.target.value);
                    }}
                    onBlur={e => setNameError(checkNameValidation(e.target.value))}
                    margin="normal"
                ></TextField>
                <TextField
                    id="standard-email"
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth={true}
                    value={email}
                    error={emailError ? true : false}
                    helperText={emailError}
                    onChange={e => {
                        setEmail(e.target.value);
                    }}
                    onBlur={e => setEmailError(checkEmailValidation(e.target.value))}
                />
                <TextField
                    id="standard-mobile"
                    label="Mobile"
                    type="mobile"
                    name="mobile"
                    fullWidth={true}
                    value={mobileNumber}
                    error={mobileNumberError ? true : false}
                    helperText={mobileNumberError}
                    onChange={e => {
                        setMobileNumber(e.target.value);
                    }}
                    onBlur={e => setMobileNumberError(checkMobileValidation(e.target.value))}
                />
                <TextField

                    id="standard-file"
                    label="Choose File"
                    type="file"
                    name="file"
                    onChange={e => {
                        onChange(e);
                    }}
                />
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                >
                    {Constants.SAVE}
                </Button>
                <Button
                    onClick={props.togglePopup}
                    color="secondary"
                    variant="contained"
                >
                    {Constants.CLOSE}
                </Button>
            </DialogActions>
        </React.Fragment >
    );
}

export default ReferAFriendPopup;
