import React, { useState, useEffect } from 'react';
import localStorage from '../../../services/storageService';
import http from '../../../services/httpService';
import { toast } from 'react-toastify';
import * as Constants from '../../../Constants/Constants';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Menu,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormControl
} from "@material-ui/core";

const AddLocation = (props) => {

    const [location, setLocation] = useState([]);
    const [locationError, setLocationError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD);
    const [addEditDisable, setAddEditDisable] = useState(false);


    const validate = () => {
        if (location === '') {
            setLocationError(Constants.LOCATION_REQUIRE);
            return false;
        } else {
            setLocationError('')
        }
    }
    const handleChange = e => {
        if (e.name === Constants.LOCATION.toLowerCase())
            setLocation(e.value);
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
                name: location
            }

            if (props.editData) {
                const data = http.putWithHeader(`location/edit/${props.editData._id}`, request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getSkills();
                        toast.success(Constants.LOCATION_EDIT_SUCCESS);
                        setAddEditDisable(false);
                    }

                })
            } else {
                const data = http.postWithHeader('location/add', request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getLocations();
                        toast.success(Constants.LOCATION_ADD_SUCCESS);
                        setAddEditDisable(false);
                    }
                })
            }

        }

    }

    useEffect(props => {
        console.log(props)
        if (props.editData) {
            setLocation(props.editData.name);
            setIsEdit(Constants.EDIT);
        }
    }, [])

    const handleClose = () => {
        props.togglePopup();
    }

    // const inlinestyle = {
    //     backgroundColor: "#f1f1f1"
    // }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });


    return (


        <Dialog
            open={props.togglePopup}
            TransitionComponent={Transition}
            keepMounted
            // onClose={props.handleCloseModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Add Location</DialogTitle>
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
                        setLocation(e.target.value);
                        setLocationError(false);
                    }}
                    margin="normal"
                ></TextField>


            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                >
                    Save
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

        // <div className='popup'>
        //     <div className='popup\_inner'>
        //         <form>
        //             <div className="container">
        //                 <div className="container header-container" style={inlinestyle} >
        //                     <span className="label-header">{isEdit} Location</span>
        //                 </div>
        //                 <div className="form-group">
        //                     <label htmlFor="location" className="label">Location</label>
        //                     <input
        //                         className="form-control"
        //                         id="location"
        //                         aria-describedby="locationHelp"
        //                         placeholder="Enter Location"
        //                         value={location}
        //                         name="location"
        //                         onChange={(e) => handleChange(e.target)}
        //                     />
        //                     {locationError &&
        //                         <div className="alert alert-danger">{locationError}</div>
        //                     }

        //                     <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)} disabled={addEditDisable}>
        //                         {props.editData ? Constants.UPDATE : Constants.SAVE}
        //                     </button>
        //                     <button type="close" className=" btn-danger cancelbtn m-2" onClick={() => handleClose()} >{Constants.CLOSE}</button>

        //                 </div>
        //             </div>
        //         </form>
        //     </div>
        // </div>
    );
}

export default AddLocation;