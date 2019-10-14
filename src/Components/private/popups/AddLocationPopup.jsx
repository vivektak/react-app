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
import { checkLocationValidation } from '../../../services/commonValidation';

const AddLocation = (props) => {

    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD);
    const [addEditDisable, setAddEditDisable] = useState(true);


    const handleSubmit = () => {
        setAddEditDisable(true);
        const request = {
            name: location
        }
        if (location.trim().length > 0) {
            if (props.editData) {
                const data = http.putWithHeader(`location/edit/${props.editData._id}`, request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getLocations();
                        success(Constants.LOCATION_EDIT_SUCCESS);
                        setAddEditDisable(false);
                    }

                }).catch(error => {

                })
            } else {
                const data = http.postWithHeader('location/add', request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getLocations();
                        success(Constants.LOCATION_ADD_SUCCESS);
                        setAddEditDisable(false);
                    }
                }).catch(error => {

                })
            }
        } else {
            // setLocationError('Location is Required')
        }

    }

    useEffect(() => {
        console.log(props)
        if (props.editData) {
            console.log('error free')
            setLocationError(null);
            setLocation(props.editData.name);
            setIsEdit(Constants.EDIT);
        }
    }, [])

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
            <DialogTitle id="alert-dialog-slide-title">{props.editData ? 'Edit' : 'Add'} Location</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Location"
                    name={Constants.LOCATION.toLowerCase()}
                    helperText={locationError}
                    fullWidth={true}
                    value={location}
                    error={locationError ? true : false}
                    onChange={e => {
                        setLocation(e.target.value.trim() === '' ? '' : e.target.value);
                    }}
                    //onBlur={checkNameValidation}
                    onBlur={e => {
                        setLocationError(checkLocationValidation(location))

                    }}
                    onKeyUp={e => handleKeyUp(e)}
                    margin="normal"
                ></TextField>


            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    //disabled={locationError ? true : locationError === null ? false : true}
                    disabled={location ? false : true}
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

export default AddLocation;