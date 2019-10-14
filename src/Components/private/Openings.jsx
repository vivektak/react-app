import React, { useEffect, useState, useContext, useRef } from 'react';
import { userContext } from '../../services/Context';
import Header from './Header';
import http from "../../services/httpService";
import DescriptionPopup from '../private/popups/DescriptionPopup';
import ViewReferredPopup from './popups/viewReferredPopup';
import * as Constants from '../../Constants/Constants';

import {
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import AddOpening from './AddOpening';
import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64, getUserInfo } from '../../services/commonHandler';
import { success } from '../../services/notificationService';
import errorResponseHandler from './../../services/errorHandler';
import Export from './exportToExcel';


const Openings = props => {


    const [openModal, setOpenModal] = useState(false);

    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [showReferralPopup, setShowReferralPopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');
    const [Opening, setOpening] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [roleData, setRoleData] = useState('');

    const fileInput = useRef();

    useEffect(() => {
        console.log(props);
        setRoleData(getUserInfo());
        getOpenings();
    }, []);

    const handleEdit = (e, rowData) => {
        if (rowData.mandatorySkills.length > 1) {
            rowData.mandatorySkills = rowData.mandatorySkills.split(',')
        }
        if (rowData.goodToHaveSkills.length > 1) {
            rowData.goodToHaveSkills = rowData.goodToHaveSkills.split(',')
        }
        setRowData(rowData);
        setOpenModal(true);
    }

    const handleDelete = (e) => {
        http.deleteWithHeader(`job/delete/${rowData._id}`).then(res => {
            if (res && res.status === 200) {
                success(Constants.OPENING_DELETE_SUCCESS);
                getOpenings();
                setIsDelete(false);
            }
        }).catch(error => {

        });

    }



    const togglePopup = () => {
        setDescriptionPopup(!descriptionPopup)
    }

    const handleAdd = () => {
        setRowData([]);
        setOpenModal(true)
    }

    const getOpenings = () => {

        console.log('opening called')
        let url = 'job/latest'
        if (props.location && props.location.state && props.location.state.path) {
            console.log(props.location.state.path);
            url = url + '?type=' + props.location.state.path;
        }
        const data = http.getWithHeader(url)
        data.then(res => {

            if (res) {
                res.data.data.map(row => {
                    if (row.mandatorySkills.length > 1) {
                        row.mandatorySkills = row.mandatorySkills.toString();
                    }
                    if (row.goodToHaveSkills.length > 1) {
                        row.goodToHaveSkills = row.goodToHaveSkills.toString();
                    }
                })
                setOpening(res.data.data);
            }


        }).catch((error) => {

        });
    }

    const handleDetailsView = (e, rowData) => {
        setRowData(rowData);
        togglePopup();

    }

    const toggleReferrals = (e, data) => {
        setRowData(data);
        setShowReferralPopup(!showReferralPopup);
    }


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggleDeletePopup = () => {
        setIsDelete(false);
    }

    const onChange = async (e) => {
        const excel = await toBase64(e.target.files[0]);
        setExcelImport(excel);
        importExcelApi(excel);
    }

    const importExcelApi = (data) => {
        http.postWithHeader('job/bulk', { file: data }).then(res => {
            getOpenings();
        }).catch(error => {

        })
    }

    const handleImport = () => {
        fileInput.current.click();
    }


    return (
        <div>
            <Header {...props} />
            <div className="container-fluid" >
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>

                    <input
                        ref={fileInput}
                        style={{ display: "none" }}
                        id="standard-file"
                        label="Choose File"
                        type="file"
                        name="file"
                        accept=".xls,.xlsx"
                        onChange={e => {
                            onChange(e);
                        }}
                    />
                    <Button
                        onClick={() => handleImport()}
                        color="secondary"
                        variant="contained"
                    >{Constants.IMPORT_EXCEL}</Button>
                    <Export data={Opening}></Export>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >{Constants.ADD_OPENING}</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: Constants.ID, field: "_id" },
                        { title: Constants.TITLE, field: "title" },
                        { title: Constants.TYPE, field: "type" },
                        { title: Constants.JOBTYPE, field: "jobType" },
                        { title: Constants.LOCATION, field: "location" },
                        { title: Constants.MANDATORYSKILLS, field: "mandatorySkills" },
                        { title: Constants.GOODTOHAVESKILLS, field: "goodToHaveSkills" },
                        { title: Constants.NOOFPOSITIONS, field: "noOfPositions" },
                    ]}
                    data={Opening}
                    title={Constants.JOB_OPENINGS}
                    actions={[
                        {

                            icon: Constants.EDIT.toLowerCase(),
                            tooltip: Constants.EDIT_USER,
                            onClick: (event, rowData) => {
                                handleEdit(event, rowData)
                            }
                        },
                        {
                            icon: Constants.DELETE.toLowerCase(),
                            tooltip: Constants.DELETE_USER,
                            onClick: (event, rowData) => {
                                setIsDelete(true);
                                setRowData(rowData);
                            }
                        },
                        {
                            icon: "remove_red_eye",
                            tooltip: Constants.VIEW_DETAILS,
                            onClick: (event, rowData) => {
                                handleDetailsView(event, rowData);
                            }
                        },
                        {
                            icon: "people",
                            tooltip: Constants.VIEW_REFERRED,
                            onClick: (event, rowData) => {
                                toggleReferrals(event, rowData);
                            }
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10
                    }}
                />
            </div>
            {openModal ? <AddOpening getOpenings={getOpenings} handleCloseModal={handleCloseModal} openModal={openModal} rowData={rowData} {...props}></AddOpening> : null}
            {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} rowData={rowData} descriptionPopup={descriptionPopup}></DescriptionPopup> : null}
            {showReferralPopup ? <ViewReferredPopup toggleReferrals={toggleReferrals} rowData={rowData} showReferralPopup={showReferralPopup}> </ViewReferredPopup> : null}
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
        </div >
    );
}

export default Openings;