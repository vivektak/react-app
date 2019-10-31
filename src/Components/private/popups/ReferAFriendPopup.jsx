import React, { useState } from 'react';
import '../../../styles/popup.css';
import '../../../styles/login.css';
import * as Constants from '../../../Constants/Constants';


import {
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    MenuItem
} from "@material-ui/core";
import { toBase64 } from '../../../services/commonHandler';
import { checkNameValidation, checkExpValidation, checkEmailValidation, checkMobileValidation } from '../../../services/commonValidation';


const ReferAFriendPopup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [experience, setExperience] = useState('');
    const [resume, setResume] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [resumeError, setResumeError] = useState('');
    const [expError, setExpError] = useState('');
    const [buttonDisable, setButtonDisable] = useState(true);


    const experiences = ['Fresher', '0 - 1', '1 - 2.5', '2.5 - 6', '6 - 10', '10+'];

    const handleSubmit = () => {
        setButtonDisable(false);
        let data = {
            jobId: props.data._id,
            name,
            email,
            mobile: mobileNumber,
            experience,
            resume

        }
        props.handleSubmit(data);
    }

    const onChange = async (e) => {
        if (e.target.files[0]) {
            let filename = e.target.files[0].name;
            let ext = filename.split('.').pop();
            if (ext === "pdf" || ext === "docx" || ext === "doc") {
                const resume = await toBase64(e.target.files[0]);
                setResume(resume);
                setResumeError(null);
            } else {
                setResumeError('Please select .pdf, .docx or .doc files');
            }
        } else {
            setResumeError('Please select .pdf, .docx or .doc files');
        }

    }

    return (
        <React.Fragment><DialogTitle id="alert-dialog-slide-title">Refer Friend</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Name"
                    name="name"
                    helperText={nameError}
                    inputProps={{ maxLength: "25" }}
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
                    inputProps={{ maxLength: "30" }}
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
                <FormControl error={expError ? true : null} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-jobType-simple">Total Experience (in years)</InputLabel>
                    <Select
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                        onBlur={e => { setExpError(checkExpValidation(e.target.value)) }}
                        inputProps={{
                            name: 'exp',
                            id: 'filled-exp-simple',
                        }}
                    >
                        {
                            experiences.map(exp => {
                                return <MenuItem value={exp}>{exp}</MenuItem>
                            })
                        }
                    </Select>
                    {expError ? <FormHelperText >{Constants.EXP_REQUIRE}</FormHelperText> : null}
                </FormControl>
                <TextField

                    id="standard-file"
                    label="Choose File"
                    type="file"
                    name="file"
                    helperText={resumeError}
                    error={resumeError ? true : false}
                    accept=".doc,.pdf"
                    onChange={e => {
                        onChange(e);
                    }}
                />
                {}
            </DialogContent>

            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={nameError && emailError && mobileNumberError && resumeError ? true : nameError === null && emailError === null && mobileNumberError === null && resumeError === null && buttonDisable ? false : true}
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
