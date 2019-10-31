import React, { useState, useEffect } from 'react';
import ReferAFriendPopup from './ReferAFriendPopup';
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';
import ReactHtmlParser from 'react-html-parser';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";

import { success } from '../../../services/notificationService';


const DescriptionPopup = (props) => {
    console.log(props);

    const { title, location, jobType, type, mandatorySkills, experience, status, goodToHaveSkills, description, noOfPositions } = props.rowData;
    const [showPopup, setShowPopup] = useState(true);
    const [addEditDisable, setAddEditDisable] = useState(false);
    const [roleData, setRoleData] = useState('');


    const referTogglePopup = () => {
        setShowPopup(!showPopup)
    }

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            console.log(res.data.data);
            setRoleData(res.data.data);
        })
    }

    const handleSubmit = (data, header) => {
        setAddEditDisable(true);
        http.postWithHeader('refer', data).then(res => {
            if (res.status === 200 || res.status === 201) {
                success(Constants.REFERRED_SUCCESS);
                props.togglePopup();
                setAddEditDisable(false);
            }
        }).catch(error => {

        });

    }

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <div>
            <Dialog
                open={props.descriptionPopup}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {showPopup ? <React.Fragment><DialogTitle id="alert-dialog-slide-title">Job Details</DialogTitle>
                    <DialogContent>
                        <p>Hiring for <strong>{title}</strong> Position (<strong style={{ textTransform: 'capitalize' }}>{type}</strong>) </p>
                        <p><strong>Location : </strong><span style={{ textTransform: 'capitalize' }}>{location}</span></p>
                        <p><strong>Job Type : </strong><span style={{ textTransform: 'capitalize' }}>{jobType}</span></p>
                        <p><strong>Experience(in years) : </strong>{experience}</p>
                        <p><strong>Mandatory Skills : </strong><span style={{ textTransform: 'capitalize' }}>{mandatorySkills}</span></p>
                        {goodToHaveSkills.length > 1 ? <p><strong>Good To Have Skills : </strong><span style={{ textTransform: 'capitalize' }}>{goodToHaveSkills.split(',').join(', ')}</span></p> : <p><strong>Good To Have Skills : </strong><span style={{ textTransform: 'capitalize' }}>{goodToHaveSkills}</span></p>}
                        <p><strong>No of Positions : </strong>{noOfPositions}</p>
                        <p><strong>Status : </strong><span style={{ textTransform: 'capitalize' }}>{status}</span></p>
                        <p><strong>Job Description : </strong><span style={{ textTransform: 'capitalize' }}>{ReactHtmlParser(description)}</span></p>

                    </DialogContent>
                    <DialogActions>

                        <Button
                            onClick={() => referTogglePopup()}
                            color="primary"
                            variant="contained"
                        >
                            {Constants.REFER_FRIEND}
                        </Button>
                        <Button
                            onClick={props.togglePopup}
                            color="secondary"
                            variant="contained"
                        >
                            {Constants.CLOSE}
                        </Button>
                    </DialogActions></React.Fragment> : <ReferAFriendPopup handleSubmit={handleSubmit} togglePopup={props.togglePopup} data={props.rowData}></ReferAFriendPopup>}
            </Dialog>
        </div>
    );
}

export default DescriptionPopup;