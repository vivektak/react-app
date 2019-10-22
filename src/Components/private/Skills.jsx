import React, { useEffect, useState, useRef } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import AddEditSkillsPopup from '../private/popups/AddEditSkillsPopup';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';
import Loader from 'react-loader-spinner';
import {
    Button,
} from "@material-ui/core";
import MaterialTable from "material-table";
import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';
import Export from './exportToExcel';
import { error } from '../../services/notificationService';

const Skills = (props) => {

    const [skills, setSkills] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [excelImport, setExcelImport] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const fileInput = useRef();

    const getSkills = () => {
        setIsLoading(true);
        const data = http.getWithHeader('skill/all')
        data.then(res => {
            setIsLoading(false);
            setSkills(res.data.data);
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
            setIsDelete(false);
        });
    }

    const togglePopup = () => {
        setPopup(!popup)
    }

    useEffect(() => {
        http.getWithHeader('user/info').then(res => {
            if (res.data.data.role === 'superadmin') {
                getSkills();
            }
            else {
                error('UnAuthorized Access')
                props.history.replace('/login')
            }
        })

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
                    <Export data={skills} className="">Handle Export </Export>

                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >{Constants.ADD_SKILL}</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: 'ID', field: '_id' },
                        { title: "Skill", field: "name" },

                    ]}
                    data={skills}
                    title="SKILLS"
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
                popup ? <AddEditSkillsPopup popup={popup} togglePopup={() => togglePopup()} getSkills={getSkills} editData={editData}></AddEditSkillsPopup> : null
            }
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
            {isLoading ? <Loader
                style={{ position: 'absolute', top: '50%', left: '50%' }}
                type="ThreeDots"
                color="#000"
                height={50}
                width={50}
                timeout={3000}
            /> : null}
        </div >
    );
}

export default Skills;