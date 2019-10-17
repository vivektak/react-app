import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
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
import { checkHRNameValidation } from '../../../services/commonValidation';

const AddHrPopup = props => {

    const [hrName, setHrName] = useState();
    const [hrNameError, setHrNameError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD)
    // const [addEditDisable, setAddEditDisable] = useState(true);

    useEffect(() => {
        if (props.editData) {
            setHrNameError(null);
            setHrName(props.editData.name);
            setIsEdit(Constants.EDIT)
        }
    }, []);
    const handleSubmit = () => {
        //setAddEditDisable(true);

        const request = {
            name: hrName
        }

        if (hrName.trim().length > 0) {

            if (props.editData) {
                const data = http.putWithHeader(`skill/edit/${props.editData._id}`, request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getHrData();
                        success('HR Name Updated Successfully');
                        //setAddEditDisable(false);
                    }

                }).catch(error => {

                })
            } else {
                const data = http.postWithHeader(`skill/add`, request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getHrData();
                        success('HR Name Added Successfully');
                        //setAddEditDisable(false);
                    }

                }).catch(error => {
                    setHrNameError('HR Name already available with this name')
                })
            }
        } else {
            setHrNameError('HR Name is Required')
        }

    }


    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    const handleClose = () => {
        props.togglePopup();
    }

    return (
        <Dialog
            open={props.popup}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{props.editData ? 'Edit' : 'Add'} HR</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Name"
                    name='hrName'
                    helperText={hrNameError}
                    fullWidth={true}
                    value={hrName}
                    error={hrNameError ? true : false}
                    onChange={e => {
                        setHrName(e.target.value.trim() === '' ? '' : e.target.value);
                    }}

                    onKeyUp={e => { handleKeyUp(e) }}
                    onBlur={e => setHrNameError(checkHRNameValidation(e.target.value))}
                    margin="normal"
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    //disabled={skillError ? true : skillError === null ? false : true}
                    disabled={hrName ? false : true}
                >
                    {props.editData ? 'Update' : 'Save'}
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

export default AddHrPopup;