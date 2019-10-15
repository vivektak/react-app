import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';

import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
} from "@material-ui/core";

import MaterialTable from "material-table";

const ViewReferredPopup = (props) => {

    const [referrals, setReferrals] = useState([]);

    const getReferrals = () => {
        console.log(props)
        const data = http.getWithHeader(`refer/${props.rowData._id}`)
        data.then(res => {
            setReferrals(res.data.data);
        }).catch(error => {

        })
    }

    useEffect(() => {
        getReferrals();
    }, [])

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleResume = (event, rowData) => {
        http.getWithHeader(`refer/resume/${rowData._id}`).then(res => {
            var file = dataURLtoFile(res.data.data, `${rowData.name}`);
            const downloadLink = document.createElement("a");

            downloadLink.href = res.data.data;
            downloadLink.download = file.name;
            downloadLink.click();
        }).catch(error => {

        });
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
                            { title: "Name", field: "name", editable: 'never' },
                            { title: "Email", field: "email", editable: 'never' },
                            { title: "Mobile", field: "mobile", editable: 'never' },
                            { title: "Status", field: "status", editable: 'onUpdate', lookup: { 'Open': 'Open', 'pending': 'pending', 'No Current Match Found': 'No Current Match Found', 'Invalid Profile': 'Invalid Profile', 'Not Reachable': 'Not Reachable', 'Not Selected': 'Not Selected', 'Resume Shortlisted': 'Resume Shortlisted', 'Offered': 'Offered', 'Deferred': 'Deferred' } },
                        ]}
                        data={referrals}
                        title="Referrals"
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    http.patchWithHeader(`refer/status/${newData._id}`, { status: newData.status }).then(res => {
                                        getReferrals();
                                        resolve();
                                    })
                                }),
                        }}
                        actions={[
                            {
                                icon: "get_app",
                                tooltip: "Resume",
                                onClick: (event, rowData) => {
                                    handleResume(event, rowData)
                                }
                            }
                        ]}
                        options={{ actionsColumnIndex: -1 }}
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