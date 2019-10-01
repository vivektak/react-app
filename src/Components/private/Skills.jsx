import React, { useEffect, useState } from 'react';
import http from '../../services/httpService';
import Header from './Header';
import localStorage from './../../services/storageService';
import AddEditSkillsPopup from '../private/popups/AddEditSkillsPopup';
import { toast } from 'react-toastify';
import '../../styles/App.css';
import * as Constants from '../../Constants/Constants';


import Loader from 'react-loader-spinner';

const Skills = () => {

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
        <div className="container-fluid">
            <Header />
            <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>{Constants.ADD}</button>
            {skills.length > 0 ?
                <table className="table table-striped">
                    <thead>
                        <tr>

                            <th scope="col">Skill</th>
                            <th colSpan="2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            skills.map(skill =>
                                <tr key={skill._id}>

                                    <td>{skill.name}</td>

                                    <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, skill)}>{Constants.EDIT}</button></td>
                                    <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, skill._id)}>{Constants.DELETE}</button></td>
                                </tr>)
                        }

                    </tbody>
                </table>
                :
                <div className='sweet-loading align-center'>
                    <Loader
                        type="CradleLoader"
                        color="#00BFFF"
                        height={100}
                        width={600}
                        timeout={999000} //3 secs

                    />
                </div>}

            {
                popup ? <AddEditSkillsPopup togglePopup={() => togglePopup()} getSkills={() => getSkills()} editData={editData}></AddEditSkillsPopup> : null
            }
        </div >
    );
}

export default Skills;