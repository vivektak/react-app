import React, { useState } from 'react';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@material-ui/core";

const ConfirmPopup = props => {

    const [isDeleted, setIsDeleted] = useState(false);

    const handleDelete = () => {
        setIsDeleted(true);
        props.handleDelete()
    }

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
                Are You sure, You want to Delete it ?


            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleDelete}
                    color="primary"
                    variant="contained"
                    disabled={isDeleted}
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