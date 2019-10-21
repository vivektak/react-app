import React, { useEffect, useState } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import MyReferralPopup from './popups/MyReferralPopup';
import Loader from 'react-loader-spinner';

import {
    Button,
} from "@material-ui/core";

import MaterialTable from "material-table";
import * as Constants from '../../Constants/Constants';

const MyReferrals = () => {

    const [myReferrals, setMyReferrals] = useState([]);
    const [myReferralsPopup, setMyReferralsPopup] = useState(false);
    const [rowData, setRowData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const getReferrals = () => {
        setIsLoading(true);
        const data = http.getWithHeader('refer/userReferals')
        data.then(res => {
            setIsLoading(false);
            setMyReferrals(res.data.data);
            console.log(res.data.data);
        }).catch(error => {

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

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }


    useEffect(() => {
        getReferrals();
    }, [])

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
                    title={Constants.MY_REFERRALS.toUpperCase()}
                    actions={[
                        {
                            icon: "get_app",
                            tooltip: "Resume",
                            onClick: (event, rowData) => {
                                handleResume(event, rowData)
                            }
                        },
                        rowData => (
                            {
                                icon: Constants.EDIT.toLowerCase(),
                                tooltip: Constants.EDIT_USER,
                                hidden: rowData.isUpdated,
                                onClick: (event, rowData) => {
                                    handleEdit(event, rowData)
                                }
                            }),
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {
                myReferralsPopup ? <MyReferralPopup togglePopup={togglePopup} myReferralsPopup={myReferralsPopup} getReferrals={() => getReferrals()} rowData={rowData}></MyReferralPopup> : null
            }

            {isLoading ? <Loader
                style={{ position: 'absolute', top: '45%', left: '50%' }}
                type="ThreeDots"
                color="#000"
                height={50}
                width={50}
                timeout={3000} //3 secs

            /> : null}
        </div>
    );
}

export default MyReferrals;