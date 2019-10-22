import React, { useState, useEffect } from 'react';
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@material-ui/core";
import { success } from '../../../services/notificationService';
import { toBase64 } from '../../../services/commonHandler';
import { checkNameValidation, checkEmailValidation, checkMobileValidation } from '../../../services/commonValidation';

const MyReferralPopup = (props) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [resumeError, setResumeError] = useState('');
    const [resume, setResume] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD);
    const [addEditDisable, setAddEditDisable] = useState(true);

    const handleSubmit = () => {
        setAddEditDisable(false);
        const request = {
            jobId: props.editData ? props.editData.jobId : 1,
            email,
            name,
            mobile,
            resume
        }

        if (props.rowData) {
            const data = http.putWithHeader(`refer/edit/${props.rowData._id}`, request)
            data.then(res => {
                if (res.status === 200 || res.status === 201) {
                    handleClose();
                    props.getReferrals();
                    success(Constants.REFERRAL_EDIT_SUCCESS);
                    setAddEditDisable(true);
                }

            }).catch(error => {

            })
        } else {
            const data = http.postWithHeader('refer', request)
            data.then(res => {
                if (res.status === 200 || res.status === 201) {
                    handleClose();
                    props.getReferrals();
                    success(Constants.REFERRAL_ADD_SUCCESS);
                    setAddEditDisable(true);
                }
            }).catch(error => {

            })
        }
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    useEffect(() => {
        if (Object.keys(props.rowData).length > 0) {
            setName(props.rowData.name);
            setMobile(props.rowData.mobile);
            setEmail(props.rowData.email);
            setResume(dataURLtoFile(props.rowData.resume, props.rowData.name));
            setIsEdit(Constants.EDIT);
            setNameError(null);
            setMobileError(null);
            setEmailError(null);
            setResumeError(null)
            let e = { target: { files: [] } }
            e.target.files[0] = dataURLtoFile(props.rowData.resume, 'shilpi.pdf')
            onChange(e)
        }
    }, [])

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

    const handleClose = () => {
        props.togglePopup();
    }

    return (
        <Dialog
            open={props.myReferralsPopup}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{Object.keys(props.rowData).length > 0 ? 'Edit' : 'Add'} Referral</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Name"
                    name={Constants.NAME.toLowerCase()}
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
                    name={Constants.EMAIL.toLowerCase()}
                    helperText={emailError}
                    inputProps={{ maxLength: "30" }}
                    fullWidth={true}
                    value={email}
                    error={emailError ? true : false}
                    onChange={e => {
                        setEmail(e.target.value);
                        setEmailError(false);
                    }}
                    margin="normal"
                    onBlur={e => setEmailError(checkEmailValidation(e.target.value))}
                ></TextField>

                <TextField
                    id="standard-mobile"
                    label="Mobile"
                    name={Constants.MOBILE.toLowerCase()}
                    helperText={mobileError}
                    fullWidth={true}
                    value={mobile}
                    error={mobileError ? true : false}
                    onChange={e => {
                        setMobile(e.target.value);
                    }}
                    onBlur={e => setMobileError(checkMobileValidation(e.target.value))}
                    margin="normal"
                ></TextField>
                <TextField

                    id="standard-file"
                    label="Choose File"
                    type="file"
                    name="file"
                    helperText={resumeError}
                    error={resumeError ? true : false}
                    accept=".doc,.docx,.pdf"
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
                    disabled={nameError && emailError && mobileError && resumeError ? true : nameError === null && emailError === null && mobileError === null && resumeError === null && addEditDisable ? false : true}
                >
                    {Object.keys(props.rowData).length > 0 ? 'Update' : 'Save'}
                </Button>
                <Button
                    onClick={props.togglePopup}
                    color="secondary"
                    variant="contained"
                >
                    Close
          </Button>
            </DialogActions>
        </Dialog >
    );
}

export default MyReferralPopup;