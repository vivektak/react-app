import React, { useEffect, useState } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import MyReferralPopup from './popups/MyReferralPopup';

import {
    Button,
} from "@material-ui/core";

import MaterialTable from "material-table";
import * as Constants from '../../Constants/Constants';

const MyReferrals = () => {

    const [myReferrals, setMyReferrals] = useState([]);
    const [myReferralsPopup, setMyReferralsPopup] = useState(false);
    const [rowData, setRowData] = useState([])

    const getReferrals = () => {
        const data = http.getWithHeader('refer/userReferals')
        data.then(res => {
            setMyReferrals(res.data.data);
        })
    }



    const handleEdit = (e, data) => {
        setRowData(data);
        togglePopup();
    }

    const handleAdd = () => {
        togglePopup();
        setRowData('');
    }

    const togglePopup = () => {
        setMyReferralsPopup(!myReferralsPopup);
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
                        { title: Constants.NAME, field: Constants.NAME.toLowerCase() },
                        { title: Constants.MOBILE, field: Constants.MOBILE.toLowerCase() },
                        { title: Constants.STATUS, field: Constants.STATUS.toLowerCase() },
                    ]}
                    data={myReferrals}
                    title={Constants.MY_REFERRALS}
                    actions={[
                        {
                            icon: Constants.EDIT.toLowerCase(),
                            tooltip: Constants.EDIT_USER,
                            onClick: (event, rowData) => {
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
    );
}

export default MyReferrals;