import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
import http from '../../services/httpService';
import AddLocation from '../private/popups/AddLocationPopup';
import * as Constants from '../../Constants/Constants';
import { toBase64 } from '../../services/commonHandler.js'
import Loader from 'react-loader-spinner';
import {
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import ConfirmPopup from './popups/ConfirmPopup';
import { success } from '../../services/notificationService';
import Export from './exportToExcel';
import { error } from '../../services/notificationService';

const Locations = (props) => {

    const [locations, setLocation] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fileInput = useRef();

    const getLocations = () => {
        setIsLoading(true);
        const data = http.getWithHeader('location/all')
        data.then(res => {
            setIsLoading(false);
            setLocation(res.data.data);
        }).catch(error => {

        })
    }

    const handleEdit = (e, data) => {
        togglePopup()
        setEditData(data);
    }

    const handleAdd = () => {
        togglePopup();
        setEditData('');

    }

    const handleDelete = (e) => {
        http.deleteWithHeader(`location/delete/${editData._id}`).then(res => {
            if (res.status === 200) {
                success(Constants.LOCATION_DELETE_SUCCESS);
                getLocations();
                setIsDelete(false);
            }
        }).catch(error => {

        });
    }

    const togglePopup = () => {
        setPopup(!popup)
    }

    const onChange = async (e) => {
        const excel = await toBase64(e.target.files[0]);
        setExcelImport(excel);
        importExcelApi(excel);
    }

    const importExcelApi = (data) => {
        http.postWithHeader('location/bulk', { file: data }).then(res => {
            getLocations();
        }).catch(error => {

        })
    }


    useEffect(() => {
        http.getWithHeader('user/info').then(res => {
            // setRoleData(res.data.data);
            if (res.data.data.role === 'superadmin') {
                getLocations();
            }
            else {
                error('UnAuthorized Access')
                props.history.replace('/login')
            }
        })


    }, []);


    const toggleDeletePopup = () => {
        setIsDelete(false);
    }

    const handleImport = () => {
        fileInput.current.click();
    }

    return (

        <div>
            <Header {...props} />
            <div className="container-fluid">
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
                    <Export data={locations}></Export>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >Add Location</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: 'ID', field: '_id' },
                        { title: "Location", field: "name", render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span> },

                    ]}
                    data={locations}
                    title="LOCATIONS"
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
                                setEditData(rowData);
                            }
                        }

                    ]}
                    options={{
                        actionsColumnIndex: -1,
                        pageSize: 10
                    }}
                />
            </div>
            {
                popup ? <AddLocation popup={popup} togglePopup={togglePopup} getLocations={getLocations} editData={editData}></AddLocation> : null
            }
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
            {isLoading ? <Loader
                style={{ position: 'absolute', top: '50%', left: '50%' }}
                type="ThreeDots"
                color="#000"
                height={50}
                width={50}
                timeout={3000} //3 secs

            /> : null}
        </div>
    );
}

export default Locations;