import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
import localStorage from '../../../services/storageService';
import http from '../../../services/httpService';
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

import MaterialTable from "material-table";

const ViewReferredPopup = (props) => {

    const [referrals, setReferrals] = useState([]);

    const getReferrals = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }
        console.log(props)
        const data = http.getWithHeader(`refer/${props.rowData._id}`, { headers })
        data.then(res => {
            setReferrals(res.data.data);
        })
    }

    const closePopup = () => {
        props.toggleReferrals();
    }

    useEffect(() => {
        getReferrals();
    }, [])

    const handleEdit = (event, rowData) => {
        console.log(rowData)
    }


    return (
        <div>
            <Dialog
                open={props.showReferralPopup}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <MaterialTable
                        columns={[
                            { title: "Name", field: "name" },
                            { title: "Email", field: "email" },
                            { title: "Mobile", field: "mobile", type: "numeric" },

                        ]}
                        data={referrals}
                        title="Referrals"
                        actions={[
                            {
                                icon: "edit",
                                tooltip: "Edit User",
                                onClick: (event, rowData) => {
                                    // Do save operation
                                    handleEdit(event, rowData)
                                }
                            }
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={props.toggleReferrals}
                        color="secondary"
                        variant="contained"
                    >
                        {Constants.CLOSE}
                    </Button>
                </DialogActions>

            </Dialog>
        </div>

    );
}

export default ViewReferredPopup;