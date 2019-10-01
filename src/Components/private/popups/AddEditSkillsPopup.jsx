import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
import http from '../../../services/httpService';
import localStorage from '../../../services/storageService';
import { toast } from 'react-toastify';
import * as Constants from '../../../Constants/Constants'


const AddEditSkillsPopup = (props) => {

    const [skill, setSkill] = useState([]);
    const [skillError, setSkillError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD)
    const [addEditDisable, setAddEditDisable] = useState(false);


    const validate = () => {
        if (skill === '') {
            setSkillError(Constants.SKILL_REQUIRE);
            return false;
        } else {
            setSkillError('')
        }
    }

    useEffect(() => {
        if (props.editData) {
            console.log(props.editData);
            setSkill(props.editData.name);
            setIsEdit(Constants.EDIT)
        }
    }, [])

    const handleSubmit = () => {
        setAddEditDisable(true);
        const isValid = validate();
        if (isValid !== false) {
            const res = localStorage.get(Constants.TOKEN)
            const headers = {
                token: res
            }

            const request = {
                name: skill
            }

            if (props.editData) {
                const data = http.putWithHeader(`skill/edit/${props.editData._id}`, request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getSkills();
                        toast.success(Constants.SKILL_SUCCESS);
                        setAddEditDisable(false);
                    }

                })
            } else {
                const data = http.postWithHeader(`skill/add`, request, { headers })
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getSkills();
                        toast.success(Constants.SKILL_ADD_SUCCESS);
                        setAddEditDisable(false);
                    }

                })
            }

        }
    }

    const handleChange = e => {
        if (e.name === Constants.SKILL) {
            setSkill(e.value);
        }
    }

    const handleClose = () => {
        props.togglePopup();
    }

    const inlinestyle = {
        backgroundColor: "#f1f1f1"
    }


    return (
        <div className='popup'>
            <div className='popup\_inner'>
                <form>
                    <div className="container">
                        <div className="container header-container" style={inlinestyle} >
                            <span className="label-header">{isEdit} Skill</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor={Constants.SKILL} className="label">Skill</label>
                            <input
                                className="form-control"
                                id={Constants.SKILL}
                                aria-describedby="skillHelp"
                                placeholder="Enter Skill"
                                value={skill}
                                name={Constants.SKILL}
                                onChange={(e) => handleChange(e.target)}
                            />
                            {skillError &&
                                <div className="alert alert-danger">{skillError}</div>
                            }

                            <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)} disabled={addEditDisable}>
                                {props.editData ? Constants.UPDATE : Constants.SAVE}
                            </button>
                            <button type="close" className=" btn-danger cancelbtn m-2" onClick={() => handleClose()} >{Constants.CLOSE}</button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddEditSkillsPopup;