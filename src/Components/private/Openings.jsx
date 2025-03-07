import React, { useEffect, useState, useRef } from 'react';
import Header from './Header';
import http from "../../services/httpService";
import DescriptionPopup from '../private/popups/DescriptionPopup';
import ViewReferredPopup from './popups/viewReferredPopup';
import * as Constants from '../../Constants/Constants';
import Loader from 'react-loader-spinner';
import {
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import AddOpening from './AddOpening';
import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';

import Export from './exportToExcel';


const Openings = props => {
    console.log(props.socket)
    const [openModal, setOpenModal] = useState(false);
    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [showReferralPopup, setShowReferralPopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');
    const [Opening, setOpening] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [roleData, setRoleData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInput = useRef();

    const onBackButtonEvent = (e) => {
        e.preventDefault()
        if (props.history.location.pathname === '/login')
            props.history.go(1);
    }

    useEffect(() => {
        window.onpopstate = onBackButtonEvent;
        getUserInfo();
        getOpenings();
    }, []);

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            setRoleData(res.data.data);
        })
    }

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
            setIsDelete(false);
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
        setIsLoading(true);
        let url = 'job/latest'
        if (props.location && props.location.state && props.location.state.path) {
            url = url + '?type=' + props.location.state.path;
        }
        const data = http.getWithHeader(url)
        data.then(res => {
            setIsLoading(false);
            if (res) {
                res.data.data.map(row => {
                    if (row.mandatorySkills.length > 1) {
                        row.mandatorySkills = row.mandatorySkills.toString().split(',').join(', ');;
                    }
                    if (row.goodToHaveSkills.length > 1) {
                        row.goodToHaveSkills = row.goodToHaveSkills.toString().split(',').join(', ');;
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

                    {roleData.role === 'admin' || roleData.role === 'superadmin' ? <React.Fragment><Button
                        onClick={() => handleImport()}
                        color="secondary"
                        variant="contained"
                    >{Constants.IMPORT_EXCEL}</Button>
                        <Export data={Opening}></Export>
                        <Button
                            onClick={() => handleAdd(true)}
                            color="secondary"
                            variant="contained"
                        >{Constants.ADD_OPENING}</Button></React.Fragment> : null}
                </div>

                <MaterialTable
                    columns={[
                        { title: Constants.ID, field: "_id" },
                        { title: Constants.TITLE, field: "title", render: row => <span style={{ textTransform: 'capitalize' }}>{row.title}</span> },
                        { title: Constants.TYPE, field: "type", render: row => <span style={{ textTransform: 'capitalize' }}>{row.type}</span> },
                        { title: Constants.JOBTYPE, field: "jobType", render: row => <span style={{ textTransform: 'capitalize' }}>{row.jobType}</span> },
                        { title: 'Experience(in years)', field: "experience", render: row => <span style={{ textTransform: 'capitalize' }}>{row.experience}</span> },
                        { title: Constants.LOCATION, field: "location", render: row => <span style={{ textTransform: 'capitalize' }}>{row.location}</span> },
                        { title: 'Status', field: "status", render: row => <span style={{ textTransform: 'capitalize' }}>{row.status}</span> },
                        { title: Constants.MANDATORYSKILLS, field: "mandatorySkills" },
                        { title: Constants.GOODTOHAVESKILLS, field: "goodToHaveSkills" },
                        { title: Constants.NOOFPOSITIONS, field: "noOfPositions", render: row => <span style={{ textTransform: 'capitalize' }}>{row.noOfPositions}</span> },
                    ]}
                    data={Opening}
                    title={Constants.JOB_OPENINGS.toUpperCase()}
                    actions={roleData.role === 'admin' || roleData.role === 'superadmin' ? [
                        {

                            icon: Constants.EDIT.toLowerCase(),
                            tooltip: 'Edit Job',
                            onClick: (event, rowData) => {
                                handleEdit(event, rowData)
                            }
                        },
                        {
                            icon: Constants.DELETE.toLowerCase(),
                            tooltip: 'Delete Job',
                            onClick: (event, rowData) => {
                                toggleDeletePopup();
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
                    ] : [
                            {
                                icon: "remove_red_eye",
                                tooltip: Constants.VIEW_DETAILS,
                                onClick: (event, rowData) => {
                                    handleDetailsView(event, rowData);
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

            {isLoading ? <Loader
                style={{ position: 'absolute', top: '45%', left: '50%' }}
                type="ThreeDots"
                color="#000"
                height={50}
                width={50}
                timeout={5000}
            /> : null}
        </div >
    );
}

export default Openings;