import React, { useState } from 'react';
import ReferAFriendPopup from './ReferAFriendPopup';
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';


import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";

import { success } from '../../../services/notificationService';


const DescriptionPopup = (props) => {

    const { title, location, jobType, skills } = props.rowData;
    const [showPopup, setShowPopup] = useState(true);
    const [addEditDisable, setAddEditDisable] = useState(false);


    const referTogglePopup = () => {
        setShowPopup(!showPopup)
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
                        <p><strong>{title}</strong></p>
                        <p><strong>Location : </strong>{location}</p>
                        <p><strong>{jobType}</strong></p>
                        <p><strong>{skills}</strong></p>

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
                    </DialogActions></React.Fragment> : <ReferAFriendPopup handleSubmit={handleSubmit} togglePopup={props.togglePopup} data={props.rowData}></ReferAFriendPopup>}}
            </Dialog>
        </div>
    );
}

export default DescriptionPopup;