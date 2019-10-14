import React from 'react';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";

const ConfirmPopup = props => {
    return (
        <Dialog
            //style={{ width: '500px' }}
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
                    Cancel
          </Button>
            </DialogActions>
        </Dialog >
    );
}

export default ConfirmPopup;