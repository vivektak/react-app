import React, { useEffect, useState, useRef } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import AddEditSkillsPopup from '../private/popups/AddEditSkillsPopup';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';

import {
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';
import Download from './exportToExcel';
//import { ExcelFile, ExcelSheet } from "react-export-excel";

const Skills = (props) => {

    const [skills, setSkills] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [excelImport, setExcelImport] = useState('');
    const [exportExcel, setExportExcel] = useState(false);

    const [isDelete, setIsDelete] = useState(false);

    const fileInput = useRef();

    const getSkills = () => {
        const data = http.getWithHeader('skill/all')
        data.then(res => {
            setSkills(res.data.data);
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

    const handleExport = () => {
        console.log(fileInput.current);
        setExportExcel(true);
        // return <ExcelFile>
        //     <ExcelSheet dataSet={skills} name="Skills" />
        // </ExcelFile>
    }

    const toggleDeletePopup = () => {
        setIsDelete(false)
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
                    >{Constants.IMPORT_EXCEL}</Button>

                    <Button
                        onClick={() => handleExport()}
                        color="secondary"
                        variant="contained"
                        className="m-2"
                    >{Constants.EXPORT_EXCEL}</Button>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >{Constants.ADD_SKILL}</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: "Skill", field: "name" },

                    ]}
                    data={skills}
                    title="Skills"
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
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {
                popup ? <AddEditSkillsPopup popup={popup} togglePopup={() => togglePopup()} getSkills={getSkills} editData={editData}></AddEditSkillsPopup> : null
            }
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
            {
                exportExcel ? <Download></Download> : null
            }
        </div >
        //         <div className='sweet-loading align-center'>
        //             <Loader
        //                 type="CradleLoader"
        //                 color="#00BFFF"
        //                 height={100}
        //                 width={600}
        //                 timeout={999000} //3 secs

        //             />
        //         </div>}
    );
}

export default Skills;