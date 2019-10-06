import React, { useEffect, useState, useRef } from 'react';
import http from '../../services/httpService';
import Header from './Header';
//import localStorage from './../../services/storageService';
import AddEditSkillsPopup from '../private/popups/AddEditSkillsPopup';
//import { toast } from 'react-toastify';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';

import {
    // AppBar,
    // Toolbar,
    // IconButton,
    // Typography,
    Button,
    // Container,
    // Dialog,
    // Slide,
    // DialogTitle,
    // DialogContent,
    // DialogContentText,
    // DialogActions,
    // Menu,
    // MenuItem,
    // TextField
} from "@material-ui/core";
import MaterialTable from "material-table";

import Loader from 'react-loader-spinner';
import { SettingsSharp } from '@material-ui/icons';

import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';


const Skills = (props) => {

    const [skills, setSkills] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [excelImport, setExcelImport] = useState('');
    const [isDelete, setIsDelete] = useState(false);

    const fileInput = useRef();

    const getSkills = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

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
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }
        console.log(editData)
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


    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = error => reject(error);
    // });

    const onChange = async (e) => {
        const excel = await toBase64(e.target.files[0]);
        setExcelImport(excel);
        importExcelApi(excel);
    }

    const importExcelApi = (data) => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }
        http.postWithHeader('skill/bulk', { file: data }).then(res => {
            getSkills();
        })
    }

    const handleImport = () => {
        console.log(fileInput.current)
        fileInput.current.click();
    }

    const handleExport = () => {
        console.log(fileInput.current);
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
                    >Add Skill</Button>
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
                                // Do save operation
                                handleEdit(event, rowData)

                            }
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete User",
                            onClick: (event, rowData) => {
                                // Do save operation
                                // handleDelete(event, rowData);
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

            {/* { openModal ? <AddOpening handleCloseModal={handleCloseModal} openModal={openModal} rowData={rowData}></AddOpening> : null }
     { descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} rowData={rowData}></DescriptionPopup> : null } */}


        </div >
        // <div className="container-fluid">
        //     <Header />
        //     <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>{Constants.ADD}</button>
        //     {skills.length > 0 ?
        //         <table className="table table-striped">
        //             <thead>
        //                 <tr>

        //                     <th scope="col">Skill</th>
        //                     <th colSpan="2">Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody>

        //                 {
        //                     skills.map(skill =>
        //                         <tr key={skill._id}>

        //                             <td>{skill.name}</td>

        //                             <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, skill)}>{Constants.EDIT}</button></td>
        //                             <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, skill._id)}>{Constants.DELETE}</button></td>
        //                         </tr>)
        //                 }

        //             </tbody>
        //         </table>
        //         :
        //         <div className='sweet-loading align-center'>
        //             <Loader
        //                 type="CradleLoader"
        //                 color="#00BFFF"
        //                 height={100}
        //                 width={600}
        //                 timeout={999000} //3 secs

        //             />
        //         </div>}

        //     {
        //         popup ? <AddEditSkillsPopup togglePopup={() => togglePopup()} getSkills={() => getSkills()} editData={editData}></AddEditSkillsPopup> : null
        //     }
        // </div >
    );
}

export default Skills;