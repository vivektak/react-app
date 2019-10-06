import React from 'react';

import {
    // AppBar,
    // Toolbar,
    // IconButton,
    // Typography,
    Button,
    //Container,
    Dialog,
    //Slide,
    DialogTitle,
    DialogContent,
    //DialogContentText,
    DialogActions,
    // Menu,
    // MenuItem
} from "@material-ui/core";

const ConfirmPopup = props => {
    return (
        <Dialog
            open={true}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title"> Confirmation</DialogTitle>
            <DialogContent>
                Are You sure, You want to Delete ?


            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handleDelete}
                    color="primary"
                    variant="contained"
                >
                    Confirm
                </Button>
                <Button
                    onClick={props.toggleDeletePopup}
                    color="secondary"
                    variant="contained"
                >
                    No
          </Button>
            </DialogActions>
        </Dialog >
    );
}

export default ConfirmPopup;