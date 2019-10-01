import React, { useState } from 'react';
import '../../../styles/popup.css';
import '../../../styles/login.css';
import * as Constants from '../../../Constants/Constants';

const ReferAFriendPopup = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [resume, setResume] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');

    const validate = () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const mobileRegex = /^[0]?[789]\d{9}$/;

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

        if (mobileNumber === '') {
            setMobileNumberError(Constants.MOBILE_REQUIRE);
        } else if (!mobileRegex.test(parseInt(mobileNumber))) {
            setMobileNumberError(Constants.INVALID_MOBILE);
        } else {
            setMobileNumberError(null);
        }

    }

    const handleChange = e => {
        if (e.name === Constants.NAME.toLowerCase())
            setName(e.value);
        if (e.name === Constants.EMAIL.toLowerCase())
            setEmail(e.value);
        if (e.name === Constants.MOBILE.toLowerCase())
            setMobileNumber(e.value);
    }

    const handleSubmit = () => {
        const isValid = validate();
        console.log(props)
        if (isValid !== false) {
            let data = {
                jobId: props.data._id,
                name,
                email,
                mobile: mobileNumber,
                resume

            }
            props.handleSubmit(data);
        }
    }

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


    const closeClicked = () => {
        setName('');
        setEmail('');
        setMobileNumber('');
        props.togglePopup();
    }

    return (

        <form >
            <div className="container">
                <div className="form-group">
                    <label htmlFor={Constants.NAME.toLowerCase()} className="label">Name</label>
                    <input
                        className="form-control"
                        id={Constants.NAME.toLowerCase()}
                        aria-describedby="nameHelp"
                        placeholder="Enter Name"
                        value={name}
                        name={Constants.NAME.toLowerCase()}
                        onBlur={(e) => validate()}
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
                        onBlur={(e) => validate()}
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
                        aria-describedby="mobile numberHelp"
                        placeholder="Enter Mobile Number"
                        value={mobileNumber}
                        name={Constants.MOBILE.toLowerCase()}
                        onBlur={(e) => validate()}
                        onChange={(e) => handleChange(e.target)}
                    />
                    {mobileNumberError &&
                        <div className="alert alert-danger">{mobileNumberError}</div>
                    }
                </div>
                <div className="form-group">
                    <input type="file" onChange={e => onChange(e)} />

                    <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)}>
                        {Constants.SAVE}
                    </button>
                    <button type="close" className=" btn-danger cancelbtn m-2" onClick={() => closeClicked()} >{Constants.CLOSE}</button>
                </div>
            </div>
        </form>


    );
}

export default ReferAFriendPopup;
