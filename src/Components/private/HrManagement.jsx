import React, { useRef, useEffect, useState } from 'react';
import Header from './../../../src/Components/private/Header';
import { toBase64 } from '../../services/commonHandler';
import http from '../../services/httpService';
import { Button } from '@material-ui/core';
import { success } from './../../../src/services/notificationService';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';
import Loader from 'react-loader-spinner';
import Export from './exportToExcel';
import MaterialTable from 'material-table';
import AddHrPopup from './popups/AddHrPopup';
import ConfirmPopup from './../../../src/Components/private/popups/ConfirmPopup';



const HrManagement = props => {

    const [hrData, setHrData] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [excelImport, setExcelImport] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //const [exportExcel, setExportExcel] = useState(false);

    const [isDelete, setIsDelete] = useState(false);

    const fileInput = useRef();

    const getSkills = () => {
        setIsLoading(true);
        const data = http.getWithHeader('skill/all')
        data.then(res => {
            setIsLoading(false);
            setHrData(res.data.data);
        }).catch(error => {

        })
    }

    const handleEdit = (e, data) => {
        togglePopup()
        setEditData(data);
    }

    const handleAdd = () => {
        togglePopup();
        setEditData('')
    }

    const handleDelete = (e) => {
        http.deleteWithHeader(`skill/delete/${editData._id}`).then(res => {
            if (res.status === 200) {
                success(Constants.SKILL_DELETE_SUCCESS)
                getSkills();
                setIsDelete(false);
            }
        }).catch(error => {

        });
    }

    const togglePopup = () => {
        setPopup(!popup)
    }


    useEffect(() => {
        getSkills();
    }, []);



    const onChange = async (e) => {
        const excel = await toBase64(e.target.files[0]);
        setExcelImport(excel);
        importExcelApi(excel);
    }

    const importExcelApi = (data) => {
        http.postWithHeader('skill/bulk', { file: data }).then(res => {
            getSkills();
        })
    }

    const handleImport = () => {
        fileInput.current.click();
    }

    const toggleDeletePopup = () => {
        setIsDelete(false)
    }


    return (<div>
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
                >{Constants.IMPORT_EXCEL}</Button>
                <Export data={hrData} className="">Handle Export </Export>

                <Button
                    onClick={() => handleAdd(true)}
                    color="secondary"
                    variant="contained"
                >ADD HR</Button>
            </div>
            <MaterialTable
                columns={[
                    { title: 'ID', field: '_id' },
                    { title: "Name", field: "name", render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span> },

                ]}
                data={hrData}
                title="HR MANAGEMENT"
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
            popup ? <AddHrPopup popup={popup} togglePopup={() => togglePopup()} getSkills={getSkills} editData={editData}></AddHrPopup> : null
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
    </div >);
}

export default HrManagement;