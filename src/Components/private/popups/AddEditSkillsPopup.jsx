import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@material-ui/core";

import { success } from '../../../services/notificationService';
import { checkSkillValidation } from '../../../services/commonValidation';

const AddEditSkillsPopup = (props) => {

    const [skill, setSkill] = useState();
    const [skillError, setSkillError] = useState('');
    const [isEdit, setIsEdit] = useState(Constants.ADD)
    const [addEditDisable, setAddEditDisable] = useState(true);

    useEffect(() => {
        if (props.editData) {
            setSkillError(null);
            setSkill(props.editData.name);
            setIsEdit(Constants.EDIT)
        }
    }, []);

    const handleSubmit = () => {
        setAddEditDisable(false);

        const request = {
            name: skill
        }

        if (skill.trim().length > 0) {

            if (props.editData) {
                const data = http.putWithHeader(`skill/edit/${props.editData._id}`, request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getSkills();
                        success(Constants.SKILL_EDIT_SUCCESS);
                        setAddEditDisable(true);
                    }

                }).catch(error => {

                })
            } else {
                const data = http.postWithHeader(`skill/add`, request)
                data.then(res => {
                    if (res.status === 200 || res.status === 201) {
                        handleClose();
                        props.getSkills();
                        success(Constants.SKILL_ADD_SUCCESS);
                        setAddEditDisable(true);
                    }

                }).catch(error => {
                    setSkillError('Skill already available with this name')
                })
            }
        } else {
            setSkillError('Skill is Required')
        }

    }


    const handleKeyUp = e => {
        if (e.keyCode === 13) {
            handleSubmit()
        }
    }

    const handleClose = () => {
        props.togglePopup();
    }

    return (
        <Dialog
            open={props.popup}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{props.editData ? 'Edit' : 'Add'} Skill</DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Skill"
                    name={Constants.SKILL.toLowerCase()}
                    helperText={skillError}
                    fullWidth={true}
                    inputProps={{ maxLength: "20" }}
                    value={skill}
                    error={skillError ? true : false}
                    onChange={e => {
                        setSkill(e.target.value.trim() === '' ? '' : e.target.value);
                    }}
                    onKeyUp={e => { handleKeyUp(e); }}
                    onBlur={e => setSkillError(checkSkillValidation(e.target.value))}
                    margin="normal"
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleSubmit}
                    color="primary"
                    variant="contained"
                    disabled={skill && addEditDisable ? false : true}
                >
                    {props.editData ? 'Update' : 'Save'}
                </Button>
                <Button
                    onClick={props.togglePopup}
                    color="secondary"
                    variant="contained"
                >
                    Close
          </Button>
            </DialogActions>
        </Dialog >
    );
}

export default AddEditSkillsPopup;