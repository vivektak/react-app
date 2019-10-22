import React, { useState, useEffect } from 'react';
import Chips from 'react-chips'
import http from '../../services/httpService';
import * as Constants from '../../Constants/Constants';
import '../../styles/App.css';
import CKEditor from "react-ckeditor-component";

import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormControl,
    FormHelperText
} from "@material-ui/core";
import { success } from '../../services/notificationService';
import { checkTitleValidation, checkStatusValidation, checkJobTypeValidation, checkExpValidation, checkDescriptionValidation, checkMandatorySkillsValidation, checkNoOfPositionsValidation, checkLocationValidation, checkTypeValidation } from '../../services/commonValidation';


const AddOpening = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [type, setType] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');
    const [noOfPositions, setNoOfPositions] = useState(0);
    const [mandatorySkills, setMandatorySkills] = useState([]);
    const [goodToHaveSkills, setGoodToHaveSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [locations, setLocations] = useState([]);
    const [status, setStatus] = useState('');
    const [submitDisable, setSubmitDisable] = useState(true);

    const [titleError, setTitleError] = useState('');
    const [typeError, setTypeError] = useState('');
    const [expError, setExpError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [noOfPositionsError, setNoOfPositionsError] = useState('');
    const [mandatorySkillsError, setMandatorySkillsError] = useState('');

    const jobTypes = ['Permanent', 'Contractual'];
    const types = ['Frontend', 'Backend', 'Fullstack', 'QA', 'Administrative'];
    const experiences = ['Fresher', '0 - 1', '1 - 2.5', '2.5 - 6', '6 - 10', '10+'];
    const statusList = ['Open', 'On Hold', 'Close'];


    const getSkills = () => {

        const data = http.getWithHeader('skill/all')
        data.then(res => {
            let data = [];
            res.data.data.map(res => {
                data.push(res.name.charAt(0).toUpperCase() + res.name.slice(1));
            })
            setSkills(data);
        }).catch(error => {

        })

    }

    const getLocations = () => {
        const data = http.getWithHeader('location/all')
        data.then(res => {
            let data = [];
            res.data.data.map(res => {
                data.push(res.name.charAt(0).toUpperCase() + res.name.slice(1));
            })
            setLocations(data);
        }).catch(error => {

        })
    }

    const onMandatoryChange = e => {
        setMandatorySkills(e);
    }

    const onGoodToHaveChange = e => {
        setGoodToHaveSkills(e);
    }

    const handleSubmit = e => {
        if (mandatorySkills.length === 0) {
            setMandatorySkillsError('Please Select atleast 1 Mandatory Skill');

        } else {
            setMandatorySkillsError(null);
            setSubmitDisable(false)
            let data = {
                title,
                type,
                description,
                experience,
                jobType,
                location,
                status,
                noOfPositions,
                mandatorySkills,
                goodToHaveSkills
            }
            if (Object.keys(props.rowData).length > 0) {
                http.putWithHeader(`job/edit/${props.rowData._id}`, data).then(res => {
                    success(Constants.OPENING_EDIT_SUCCESS);
                    props.getOpenings();
                    setSubmitDisable(true);
                    props.handleCloseModal();

                }).catch(error => {

                });
            } else {
                http.postWithHeader('job/add', data).then(res => {
                    props.history.replace(`/${Constants.OPENINGS}`);
                    props.handleCloseModal()
                    success(Constants.OPENING_ADD_SUCCESS);
                    props.getOpenings();
                    setSubmitDisable(true);

                }).catch(error => {

                });
            }
        }
    }

    useEffect(() => {

        getSkills();
        getLocations();
        if (Object.keys(props.rowData).length > 0) {
            setSubmitDisable(true);
            const dataToEdit = props.rowData;
            setType(dataToEdit.type);
            setStatus(dataToEdit.status);
            setTitle(dataToEdit.title);
            setExperience(dataToEdit.experience)
            setDescription(dataToEdit.description);
            setLocation(dataToEdit.location);
            setJobType(dataToEdit.jobType);
            setNoOfPositions(dataToEdit.noOfPositions);
            setMandatorySkills(dataToEdit.mandatorySkills.split(','));
            setGoodToHaveSkills(dataToEdit.goodToHaveSkills.length > 0 ? dataToEdit.goodToHaveSkills.split(',') : [])

            setTitleError(null);
            setStatusError(null);
            setTypeError(null);
            setJobTypeError(null);
            setLocationError(null);
            setNoOfPositionsError(null);
        }
    }, []);

    return (

        <Dialog
            open={props.openModal}
            keepMounted
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{Object.keys(props.rowData).length > 0 ? 'Edit' : 'Add'} Opening </DialogTitle>
            <DialogContent>
                <TextField
                    className="opening-box"
                    id="standard-name"
                    label="Title"
                    inputProps={{ maxLength: "25" }}
                    name={Constants.TITLE.toLowerCase()}
                    helperText={titleError}
                    fullWidth={true}
                    value={title}
                    error={titleError ? true : false}
                    onChange={e => {
                        setTitle(e.target.value);
                    }}
                    onBlur={e => { setTitleError(checkTitleValidation(e.target.value)) }}
                    margin="normal"
                ></TextField>

                <FormControl error={typeError ? true : null} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-jobType-simple">Type</InputLabel>
                    <Select
                        value={type}
                        onChange={e => setType(e.target.value)}
                        onBlur={e => { setTypeError(checkTypeValidation(e.target.value)) }}
                        inputProps={{
                            name: 'type',
                            id: 'filled-type-simple',
                        }}
                    >
                        {
                            types.map(type => {
                                return <MenuItem value={type}>{type}</MenuItem>
                            })
                        }
                    </Select>
                    {typeError ? <FormHelperText >{Constants.TYPE_REQUIRE}</FormHelperText> : null}
                </FormControl>

                <FormControl error={expError ? true : null} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-jobType-simple">Total Experience (in years)</InputLabel>
                    <Select
                        value={experience}
                        onChange={e => setExperience(e.target.value)}
                        onBlur={e => { setExpError(checkExpValidation(e.target.value)) }}
                        inputProps={{
                            name: 'exp',
                            id: 'filled-exp-simple',
                        }}
                    >
                        {
                            experiences.map(exp => {
                                return <MenuItem value={exp}>{exp}</MenuItem>
                            })
                        }
                    </Select>
                    {expError ? <FormHelperText >{Constants.EXP_REQUIRE}</FormHelperText> : null}
                </FormControl>

                <FormControl error={jobTypeError ? true : null} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-jobType-simple">Job Type</InputLabel>
                    <Select
                        value={jobType}
                        onChange={e => setJobType(e.target.value)}
                        onBlur={e => { setJobTypeError(checkJobTypeValidation(e.target.value)) }}
                        inputProps={{
                            name: 'jobType',
                            id: 'filled-jobType-simple',
                        }}
                    >
                        {
                            jobTypes.map(job => {
                                return <MenuItem value={job}>{job}</MenuItem>
                            })
                        }
                    </Select>
                    {jobTypeError ? <FormHelperText >{Constants.JOB_TYPE_REQUIRE}</FormHelperText> : null}
                </FormControl>

                <FormControl error={locationError ? true : false} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-location-simple">Location</InputLabel>
                    <Select
                        value={location}
                        onChange={e => { console.log(locations); console.log(e.target); setLocation(e.target.value) }}
                        onBlur={e => setLocationError(checkLocationValidation(e.target.value))}
                        inputProps={{
                            name: 'location',
                            id: 'filled-location-simple',
                        }}
                    >
                        {
                            locations.map(loc => {
                                return <MenuItem value={loc}>{loc}</MenuItem>
                            })
                        }
                    </Select>
                    {locationError ? <FormHelperText >{Constants.LOCATION_REQUIRE}</FormHelperText> : null}
                </FormControl>

                <FormControl error={statusError ? true : false} variant="outlined" className="opening-box" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-location-simple">Status</InputLabel>
                    <Select
                        value={status}
                        onChange={e => { console.log(locations); console.log(e.target); setStatus(e.target.value) }}
                        onBlur={e => setStatusError(checkStatusValidation(e.target.value))}
                        inputProps={{
                            name: 'status',
                            id: 'filled-location-simple',
                        }}
                    >
                        {
                            statusList.map(status => {
                                return <MenuItem value={status}>{status}</MenuItem>
                            })
                        }
                    </Select>
                    {statusError ? <FormHelperText >Status is Required</FormHelperText> : null}
                </FormControl>

                <div className="opening-box" >
                    <Chips
                        value={mandatorySkills}
                        placeholder="Mandatory Skills"
                        onChange={(e) => onMandatoryChange(e)}
                        id={Constants.MANDATORY_SKILLS}
                        //onBlur={e => setMandatorySkillsError(checkMandatorySkillsValidation(e.target.value))}
                        suggestions={skills}

                    />
                    {mandatorySkillsError &&
                        <span style={{ color: '#f44336' }}>{mandatorySkillsError}</span>

                    }

                </div>

                <div className="opening-box">
                    <Chips
                        placeholder="Good To Have Skills"
                        value={goodToHaveSkills}
                        onChange={(e) => onGoodToHaveChange(e)}
                        id={Constants.GOOD_TO_HAVE_SKILLS}
                        suggestions={skills}
                    />
                </div>
                <TextField
                    className="opening-box"
                    id="standard-number"
                    label="No of Positions"
                    type="number"
                    name={Constants.NO_OF_POSITIONS}
                    helperText={noOfPositionsError}
                    fullWidth={true}
                    value={noOfPositions}
                    inputProps={{ min: "0", max: "10", step: "1" }}
                    error={noOfPositionsError ? true : false}
                    onChange={e => {
                        setNoOfPositions(parseInt(e.target.value));
                    }}
                    onBlur={e => {
                        setNoOfPositionsError(checkNoOfPositionsValidation(e.target.value))
                    }}
                    margin="normal"
                ></TextField>

                <CKEditor
                    activeClass="p10"
                    content={description}
                    events={{
                        "change": e => { setDescription(e.editor.getData()) }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={e => handleSubmit(e)}
                    color="primary"
                    variant="contained"
                    disabled={titleError && typeError && jobTypeError && locationError && noOfPositionsError && statusError ? true : titleError === null && typeError === null && jobTypeError === null && locationError === null && statusError === null && noOfPositionsError === null && submitDisable ? false : true}
                >
                    {Object.keys(props.rowData).length > 0 ? "Update" : "Save"}
                </Button>
                <Button
                    onClick={props.handleCloseModal}
                    color="secondary"
                    variant="contained"
                >
                    Close
          </Button>
            </DialogActions>
        </Dialog >
    );
}

export default AddOpening;