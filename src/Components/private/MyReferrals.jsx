import React, { useEffect, useState } from 'react';
import http from '../../services/httpService';
import localStorage from 'local-storage';
import Header from './Header';
import Loader from 'react-loader-spinner';
import MyReferralPopup from './popups/MyReferralPopup';
import * as Constants from '../../Constants/Constants';


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

const MyReferrals = () => {

    const [myReferrals, setMyReferrals] = useState([]);
    const [myReferralsPopup, setMyReferralsPopup] = useState(false);
    const [rowData, setRowData] = useState([])

    const getReferrals = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('refer/userReferals', { headers })
        data.then(res => {
            setMyReferrals(res.data.data);
        })
    }



    const handleEdit = (e, data) => {
        setRowData(data);
        togglePopup()
    }

    const handleAdd = () => {
        togglePopup();
        setRowData('')
    }

    const togglePopup = () => {
        setMyReferralsPopup(!myReferralsPopup)
    }


    useEffect(() => {
        getReferrals();
    }, [])


    return (


        <div>
            <Header />
            <div className="container-fluid" >
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >Add Referral</Button>
                </div>
                <MaterialTable
                    columns={[

                        { title: "Job Id", field: "jobId" },
                        { title: "Name", field: "name" },
                        { title: "Mobile", field: "mobile" },
                        { title: "Status", field: "status" },
                    ]}
                    data={myReferrals}
                    title="My Referrals"
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
            </div>
            {
                myReferralsPopup ? <MyReferralPopup togglePopup={togglePopup} myReferralsPopup={myReferralsPopup} getReferrals={() => getReferrals()} rowData={rowData}></MyReferralPopup> : null
            }
        </div>

        // <div >
        //     <Header />
        //     <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>{Constants.ADD}</button>
        //     {myReferrals.length > 0 ?
        //         <table className="table table-striped">
        //             <thead>
        //                 <tr>

        //                     <th scope="col">Job ID</th>
        //                     <th scope="col">Name</th>

        //                     <th scope="col">Mobile</th>
        //                     <th scope="col">Status</th>
        //                     <th colSpan="2">Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody>

        //                 {
        //                     myReferrals.map(referral =>
        //                         <tr key={referral._id}>
        //                             <td>{referral.jobId}</td>
        //                             <td>{referral.name}</td>
        //                             <td>{referral.mobile}</td>
        //                             <td>{referral.status}</td>
        //                             <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, referral)}>{Constants.EDIT}</button></td>
        //                         </tr>)
        //                 }

        //             </tbody>
        //         </table>
        //         : myReferrals.length === 0 ?
        //             <div>No Records Found</div> : <div className='sweet-loading align-center'>
        //                 <Loader
        //                     type="CradleLoader"
        //                     color="#00BFFF"
        //                     height={100}
        //                     width={600}
        //                     timeout={999000} //3 secs

        //                 />
        //             </div>}

        //     {
        //         myReferralsPopup ? <MyReferralPopup togglePopup={() => togglePopup()} getReferrals={() => getReferrals()} editData={editData}></MyReferralPopup> : null
        //     }
        // </div>
    );
}

export default MyReferrals;