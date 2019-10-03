import React, { useState } from 'react';
import ReferAFriendPopup from './ReferAFriendPopup';
import http from '../../../services/httpService';
import localStorage from '../../../services/storageService';
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
    MenuItem
} from "@material-ui/core";


const DescriptionPopup = (props) => {

    const { title, location, jobType, skills } = props.rowData;
    const [showPopup, setShowPopup] = useState(true);
    const [addEditDisable, setAddEditDisable] = useState(false);


    const referTogglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleSubmit = (data, header) => {
        setAddEditDisable(true);
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        http.postWithHeader('refer', data, { headers }).then(res => {
            if (res.status === 200 || res.status === 201) {
                toast.success(Constants.REFERRED_SUCCESS)
                props.togglePopup();
                setAddEditDisable(false);
            }
        });

    }

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });



    return (
        <div>
            <Dialog
                open={props.togglePopup}
                TransitionComponent={Transition}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                {showPopup ? <React.Fragment><DialogTitle id="alert-dialog-slide-title">Details</DialogTitle>
                    <DialogContent>
                        <p><strong>{title}</strong></p>
                        <p><strong>{location}</strong></p>
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
                    </DialogActions></React.Fragment> : <ReferAFriendPopup handleSubmit={handleSubmit} togglePopup={props.togglePopup} data={props.descData}></ReferAFriendPopup>}}
            </Dialog>
        </div>
        // <div className='popup'>
        //     <div className='popup\_inner'>
        //         <div className="container-fluid">

        //             {showPopup ? <React.Fragment><p><strong>{title}</strong></p>
        //                 <p><strong>{location}</strong></p>
        //                 <p><strong>{jobType}</strong></p>
        //                 <p><strong>{skills}</strong></p>
        //                 <button onClick={() => referTogglePopup()} className='btn btn-primary cancelbtn' disabled={addEditDisable}>{Constants.REFER_FRIEND}</button>
        //                 <button onClick={props.togglePopup} className="btn btn-danger cancelbtn">{Constants.CLOSE}</button>
        //             </React.Fragment>
        //                 :
        //                 <ReferAFriendPopup handleSubmit={handleSubmit} togglePopup={props.togglePopup} data={props.descData}></ReferAFriendPopup>}
        //         </div >
        //     </div>
        // </div >
    );
}

export default DescriptionPopup;