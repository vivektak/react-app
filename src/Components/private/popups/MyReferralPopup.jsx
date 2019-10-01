import React, { useState, useEffect } from 'react';
import http from '../../../services/httpService';
import { toast } from 'react-toastify';
import localStorage from 'local-storage';
import * as Constants from '../../../Constants/Constants';


const MyReferralPopup = (props) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobile, setMobile] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [resume, setResume] = useState('');
    const [resumeError, setResumeError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD);
    const [addEditDisable, setAddEditDisable] = useState(false);


    const validate = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mobileRegex = /^[0]?[789]\d{9}$/;

        console.log(name)

        if (name === '') {
            setNameError(Constants.NAME_REQUIRE);
            return false;
        } else {
            setNameError('')
        }

        if (email.trim() === "") {
            setEmailError(Constants.EMAIL_REQUIRE);
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError(Constants.INVALID_EMAIL);
            return false;
        }
        else {
            setEmailError(null)
        }

        if (mobile === '') {
            setMobileError(Constants.MOBILE_REQUIRE);
        } else if (!mobileRegex.test(parseInt(mobile))) {
            setMobileError(Constants.INVALID_MOBILE);
        } else {
            setMobileError(null);
        }
    }
    const handleChange = e => {
        if (e.name === Constants.NAME.toLowerCase())
            setName(e.value);
        if (e.name === Constants.MOBILE.toLowerCase())
            setMobile(e.value);
        if (e.name === Constants.EMAIL.toLowerCase())
            setEmail(e.value);
    }

    const handleSubmit = () => {
        setAddEditDisable(true);
        const isValid = validate();

        if (isValid !== false) {
            const res = localStorage.get(Constants.TOKEN)
            let headers = {
                token: res
            }

            const request = {
                jobId: props.editData ? props.editData.jobId : 1,
                email,
                name,
                mobile,
                resume
            }

            if (props.editData) {
                const data = http.putWithHeader(`refer/edit/${props.editData._id}`, request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getReferrals();
                        toast.success(Constants.REFERRAL_EDIT_SUCCESS);
                        setAddEditDisable(false);
                    }

                })
            } else {
                const data = http.postWithHeader('refer', request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getReferrals();
                        toast.success(Constants.REFERRAL_ADD_SUCCESS);
                        setAddEditDisable(false);
                    }
                })
            }

        }

    }

    useEffect(() => {
        console.log(props)
        if (props.editData) {
            setName(props.editData.name);
            setMobile(props.editData.mobile);
            setEmail(props.editData.email);
            setIsEdit(Constants.EDIT);
        }
    }, [])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onChange = async (e) => {
        console.log(e);
        console.log(e.target.files[0]);
        const resume = await toBase64(e.target.files[0]);
        setResume(resume);
    }


    const handleClose = () => {
        props.togglePopup();
    }

    const inlinestyle = {
        backgroundColor: "#f1f1f1"
    }

    return (
        <div className='popup'>
            <div className='popup\_inner'>
                <form>
                    <div className="container">
                        <div className="container header-container" style={inlinestyle} >
                            <span className="label-header">{isEdit} Referral</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor={Constants.NAME.toLowerCase()} className="label">Name</label>
                            <input
                                className="form-control"
                                id={Constants.NAME.toLowerCase()}
                                aria-describedby="nameHelp"
                                placeholder="Enter Name"
                                value={name}
                                name={Constants.NAME.toLowerCase()}
                                onBlur={() => validate()}
                                onChange={(e) => handleChange(e.target)}
                            />
                            {nameError &&
                                <div className="alert alert-danger">{nameError}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor={Constants.EMAIL.toLowerCase()} className="label">Email</label>
                            <input
                                className="form-control"
                                id={Constants.EMAIL.toLowerCase()}
                                aria-describedby="emailHelp"
                                placeholder="Enter Email"
                                value={email}
                                name={Constants.EMAIL.toLowerCase()}
                                onBlur={() => validate()}
                                onChange={(e) => handleChange(e.target)}
                            />
                            {emailError &&
                                <div className="alert alert-danger">{emailError}</div>
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor={Constants.MOBILE.toLowerCase()} className="label">Mobile</label>
                            <input
                                className="form-control"
                                id={Constants.MOBILE.toLowerCase()}
                                aria-describedby="mobileHelp"
                                placeholder="Enter Mobile"
                                value={mobile}
                                name={Constants.MOBILE.toLowerCase()}
                                onBlur={() => validate()}
                                onChange={(e) => handleChange(e.target)}
                            />
                            {mobileError &&
                                <div className="alert alert-danger">{mobileError}</div>
                            }

                        </div>
                        <div className="form-group">
                            <input type="file" onChange={e => onChange(e)} />

                            <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)} disabled={addEditDisable}>
                                {props.editData ? Constants.UPDATE : Constants.SAVE}
                            </button>
                            <button type="close" className=" btn-danger cancelbtn m-2" onClick={() => handleClose()} >{Constants.CLOSE}</button>

                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
}

export default MyReferralPopup;