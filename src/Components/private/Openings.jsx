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
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';



const Openings = props => {
    useEffect(props => {
        getOpenings();
    }, []);

    const [openModal, setOpenModal] = useState(false);

    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [descData, setDescData] = useState({});
    const [showReferralPopup, setShowReferralPopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');
    const [Opening, setOpening] = useState([]);
    const [rowData, setRowData] = useState([]);

    const fileInput = useRef();


    const handleEdit = (e, rowData) => {
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
        const data = http.getWithHeader('job/latest?count=5&page=1')
        data.then(res => {
            console.log(res.data.data);
            setOpening(res.data.data);
        })

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
        http.postWithHeader('skill/bulk', { file: data }).then(res => {
            getOpenings();
        })
    }

    const handleImport = () => {
        fileInput.current.click();
    }

    const handleExport = () => {
        console.log(fileInput.current);
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
                    >Import Excel</Button>
                    <Button
                        onClick={() => handleExport()}
                        color="secondary"
                        variant="contained"
                        className="m-2"
                    >Export Excel</Button>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >Add Opening</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: "ID", field: "_id" },
                        { title: "Title", field: "title" },
                        { title: "Job Type", field: "jobType" },
                        { title: "Location", field: "location" },
                        { title: "Mandatory Skills", field: "mandatorySkills" },
                        { title: "Good To Have Skills", field: "goodToHaveSkills" },
                        { title: "Number of Positions", field: "noOfPositions" },

                    ]}
                    data={Opening}
                    title="Job Openings"
                    actions={[
                        {
                            icon: "edit",
                            tooltip: "Edit User",
                            onClick: (event, rowData) => {
                                handleEdit(event, rowData)
                            }
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete User",
                            onClick: (event, rowData) => {
                                setIsDelete(true);
                                setRowData(rowData);
                            }
                        },
                        {
                            icon: "remove_red_eye",
                            tooltip: "View Details",
                            onClick: (event, rowData) => {
                                handleDetailsView(event, rowData);
                            }
                        },
                        {
                            icon: "people",
                            tooltip: "View Referred",
                            onClick: (event, rowData) => {
                                toggleReferrals(event, rowData);
                            }
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {openModal ? <AddOpening getOpenings={getOpenings} handleCloseModal={handleCloseModal} openModal={openModal} rowData={rowData} {...props}></AddOpening> : null}
            {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} rowData={rowData} descriptionPopup={descriptionPopup}></DescriptionPopup> : null}
            {showReferralPopup ? <ViewReferredPopup toggleReferrals={toggleReferrals} rowData={rowData} showReferralPopup={showReferralPopup}> </ViewReferredPopup> : null}
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
        </div>
    );
}

export default Openings;