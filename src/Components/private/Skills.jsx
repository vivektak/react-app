import React, { useEffect, useState } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import localStorage from './../../services/storageService';
import AddEditSkillsPopup from '../private/popups/AddEditSkillsPopup';
import { toast } from 'react-toastify';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Menu,
    MenuItem
} from "@material-ui/core";
import MaterialTable from "material-table";

import Loader from 'react-loader-spinner';

const Skills = (props) => {

    const [skills, setSkills] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('')

    const getSkills = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('skill/all', { headers })
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

    const handleDelete = (e, data) => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }
        http.deleteWithHeader(`skill/delete/${data}`, { headers }).then(res => {
            if (res.status === 200) {
                toast.error(Constants.SKILL_DELETE_SUCCESS);
                getSkills();
            }
        });
    }

    const togglePopup = () => {
        console.log('ásd')
        setPopup(!popup)
    }


    useEffect(() => {
        getSkills();
    }, [])

    return (
        <div>
            <Header {...props} />
            <Container>
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>
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
                                handleDelete(event, rowData);
                            }
                        }

                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </Container>
            {
                popup ? <AddEditSkillsPopup popup={popup} togglePopup={() => togglePopup()} getSkills={getSkills} editData={editData}></AddEditSkillsPopup> : null
            }

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