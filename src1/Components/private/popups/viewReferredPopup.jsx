import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
//import localStorage from '../../../services/storageService';
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';

import {
    // AppBar,
    // Toolbar,
    // IconButton,
    // Typography,
    Button,
    //Container,
    Dialog,
    // Slide,
    // DialogTitle,
    DialogContent,
    //DialogContentText,
    DialogActions,
    // Menu,
    // MenuItem
} from "@material-ui/core";

import MaterialTable from "material-table";

const ViewReferredPopup = (props) => {

    const [referrals, setReferrals] = useState([]);

    const getReferrals = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }
        console.log(props)
        const data = http.getWithHeader(`refer/${props.rowData._id}`)
        data.then(res => {
            setReferrals(res.data.data);
        })
    }

    // const closePopup = () => {
    //     props.toggleReferrals();
    // }

    useEffect(() => {
        getReferrals();
    }, [])

    // const handleEdit = (event, rowData) => {
    //     console.log(rowData)
    // }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    //Usage example:

    const handleResume = (event, rowData) => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        http.getWithHeader(`refer/resume/${rowData._id}`).then(res => {
            var file = dataURLtoFile(res.data.data, `${rowData.name}`);
            const downloadLink = document.createElement("a");

            downloadLink.href = res.data.data;
            downloadLink.download = file.name;
            downloadLink.click();
        });



        // var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=', 'hello.txt');
        // console.log(file);
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
                            { title: "Status", field: "status", editable: 'onUpdate', lookup: { 1: 'pending', 2: 'No Current Match Found', 3: 'Invalid Profile', 4: 'Not Reachable', 5: 'Not Selected', 6: 'Resume Shortlisted', 7: 'Offered', 8: 'Deferred' } },
                            // { title: "Resume", field: "name", editable: 'never', render: () => { return <GetAppIcon /> } }
                        ]}
                        data={referrals}
                        title="Referrals"
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    // const res = localStorage.get(Constants.TOKEN)
                                    // let headers = {
                                    //     token: res
                                    // }
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
                                    // Do save operation
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