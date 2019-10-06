import React, { useState, useEffect } from 'react';
import Chips from 'react-chips'
//import Header from './Header';
//import localStorage from '../../services/storageService'
import http from '../../services/httpService';
//import { toast } from 'react-toastify';
import * as Constants from '../../Constants/Constants';


import {
    // AppBar,
    // Toolbar,
    // IconButton,
    // Typography,
    Button,
    //Container,
    Dialog,
    //Slide,
    DialogTitle,
    DialogContent,
    //DialogContentText,
    DialogActions,
    //Menu,
    MenuItem,
    TextField,
    Select,
    InputLabel,
    FormControl
} from "@material-ui/core";
//import { ChipSet, Chip } from '@material/react-chips';
//import MaterialIcon from '@material/react-material-icon';
//import Alert from "react-s-alert";
import { success } from '../../services/notificationService';

const AddOpening = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState([]);
    const [noOfPositions, setNoOfPositions] = useState(0);
    const [mandatorySkills, setMandatorySkills] = useState([]);
    const [goodToHaveSkills, setGoodToHaveSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [locations, setLocations] = useState([]);
    const [submitDisable, setSubmitDisable] = useState(true);

    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [noOfPositionsError, setNoOfPositionsError] = useState('');
    const [mandatorySkillsError, setMandatorySkillsError] = useState('');
    const [goodToHaveSkillsError, setGoodToHaveSkillsError] = useState('');

    const jobTypes = ['Permanent', 'Contractual'];



    const getSkills = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        const data = http.getWithHeader('skill/all')
        data.then(res => {
            let data = [];
            res.data.data.map(res => {
                data.push(res.name);
            })
            setSkills(data);
        })

    }

    const getLocations = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        const data = http.getWithHeader('location/all')
        data.then(res => {
            let data = [];
            res.data.data.map(res => {
                data.push(res.name);
            })
            setLocations(data);
        })
    }


    const validate = e => {
        if (title === '') {
            setTitleError(Constants.TITLE_REQUIRE);
            return false;
        } else {
            setTitleError('')
        }

        if (description === '') {
            setDescError(Constants.DESCRIPTION_REQUIRE);
            return false;
        } else {
            setDescError('');
        }

        if (jobType === '') {
            setJobTypeError(Constants.JOB_TYPE_REQUIRE);
        } else {
            setJobTypeError('');
        }

        if (location === '') {
            setLocationError(Constants.LOCATION_REQUIRE);
            return false;
        } else {
            setLocationError('')
        }

        if (noOfPositions === 0) {
            setNoOfPositionsError(Constants.NO_OF_POSITIONS_REQUIRE);
            return false;
        } else {
            setNoOfPositionsError('')
        }

        if (mandatorySkills.length === 0) {
            setMandatorySkillsError(Constants.SKILLS_REQUIRE);
            return false;
        } else {
            setMandatorySkillsError('');
        }

    }

    // const handleChange = e => {
    //     if (e.name === Constants.TITLE.toLowerCase())
    //         setTitle(e.value);
    //     if (e.name === Constants.DESCRIPTION.toLowerCase())
    //         setDescription(e.value);
    //     if (e.name === Constants.JOB_TYPE)
    //         setJobType(e.value);
    //     if (e.name === Constants.LOCATION.toLowerCase())
    //         setLocation(e.value);
    //     if (e.name === Constants.NO_OF_POSITIONS)
    //         setNoOfPositions(e.value);

    // }

    const onMandatoryChange = e => {
        setMandatorySkills(e);
    }

    // const onLocationChange = e => {
    //     setLocation(e);
    // }

    const onGoodToHaveChange = e => {
        setGoodToHaveSkills(e);
    }


    const handleSubmit = e => {
        setSubmitDisable(true);
        const isValid = validate(e);
        if (isValid !== false) {
            let data = {
                title,
                description,
                jobType,
                location,
                noOfPositions,
                mandatorySkills,
                goodToHaveSkills
            }
            // const res = localStorage.get(Constants.TOKEN)
            // let headers = {
            //     token: res
            // }

            console.log(props)
            console.log(data)
            if (Object.keys(props.rowData).length > 0) {
                http.putWithHeader(`job/edit/${props.rowData._id}`, data).then(res => {
                    success(Constants.OPENING_EDIT_SUCCESS);
                    props.getOpenings();
                    setSubmitDisable(false);
                    props.handleCloseModal();

                });
            } else {
                http.postWithHeader('job/add', data).then(res => {
                    props.history.replace(`/${Constants.OPENINGS}`);
                    props.handleCloseModal()
                    success(Constants.OPENING_ADD_SUCCESS);
                    props.getOpenings();
                    setSubmitDisable(false);

                });
            }


        }
    }



    useEffect(() => {
        getSkills();
        getLocations();
        console.log(props)
        if (Object.keys(props.rowData).length > 0) {
            const dataToEdit = props.rowData;
            setTitle(dataToEdit.title);
            setDescription(dataToEdit.description);
            setLocation(dataToEdit.location);
            setJobType(dataToEdit.jobType);
            setNoOfPositions(dataToEdit.noOfPositions);
            setMandatorySkills(dataToEdit.mandatorySkills);
            setGoodToHaveSkills(dataToEdit.goodToHaveSkills);

            //})
        }
    }, []);

    // const resetClicked = () => {
    //     setTitle('');
    //     setMandatorySkills([]);
    //     setGoodToHaveSkills([]);
    //     setLocation('');
    //     setNoOfPositions(0);
    //     setJobType('');
    //     setDescription('');
    // }


    return (

        <Dialog
            open={props.openModal}
            keepMounted
            // onClose={props.handleCloseModal}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{Object.keys(props.rowData).length > 0 ? 'Edit' : 'Add'} Opening </DialogTitle>
            <DialogContent>
                <TextField
                    id="standard-name"
                    label="Title"
                    name={Constants.TITLE.toLowerCase()}
                    helperText={titleError}
                    fullWidth={true}
                    value={title}
                    error={titleError ? true : false}
                    onChange={e => {
                        setTitle(e.target.value);
                        setTitleError(false);
                    }}
                    margin="normal"
                ></TextField>

                <FormControl variant="outlined" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-jobType-simple">Job Type</InputLabel>
                    <Select
                        value={jobType}
                        onChange={e => setJobType(e.target.value)}
                        inputProps={{
                            name: 'jobType',
                            id: 'filled-jobType-simple',
                        }}
                    >
                        <MenuItem value={jobType}>Select Location</MenuItem>
                        {
                            jobTypes.map(job => {
                                return <MenuItem value={job}>{job}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                {jobTypeError &&
                    <div className="alert alert-danger">{jobTypeError}</div>
                }

                <FormControl variant="outlined" style={{
                    width: "100%",
                }}>
                    <InputLabel htmlFor="filled-location-simple">Location</InputLabel>
                    <Select
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        inputProps={{
                            name: 'location',
                            id: 'filled-location-simple',
                        }}
                    >
                        <MenuItem value={location}>Select Location</MenuItem>
                        {
                            locations.map(loc => {
                                return <MenuItem value={loc}>{loc}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <Chips
                    value={mandatorySkills}
                    placeholder="Mandatory Skills"
                    onChange={(e) => onMandatoryChange(e)}
                    id={Constants.MANDATORY_SKILLS}
                    onBlur={() => validate()}
                    suggestions={skills}

                />
                {mandatorySkillsError &&
                    <div className="alert alert-danger">{mandatorySkillsError}</div>
                }

                <Chips
                    placeholder="Good To Have Skills"
                    value={goodToHaveSkills}
                    onChange={(e) => onGoodToHaveChange(e)}
                    id={Constants.GOOD_TO_HAVE_SKILLS}
                    suggestions={skills}
                />
                {goodToHaveSkillsError &&
                    <div className="alert alert-danger">{goodToHaveSkillsError}</div>
                }


                <TextField
                    id="standard-number"
                    label="No of Positions"
                    type="number"
                    name={Constants.NO_OF_POSITIONS}
                    helperText={noOfPositionsError}
                    fullWidth={true}
                    value={noOfPositions}
                    error={noOfPositionsError ? true : false}
                    onChange={e => {
                        setNoOfPositions(e.target.value);
                        setNoOfPositionsError(false);
                    }}
                    margin="normal"
                ></TextField>

                <textarea value={description} onChange={e => setDescription(e.target.value)} className="mdc-text-field__input mt-2" style={{ width: "100%" }} rows="4" cols="40" aria-label="Label"></textarea>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={e => handleSubmit(e)}
                    color="primary"
                    variant="contained"
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

        // <div>
        //     <Header />
        //     <form  >
        //         <div className="container" style={inlinestyle} >
        //             <span className="header">{props.match.params.id ? 'Edit' : 'Add'} Opening</span>
        //         </div>
        //         <div className="container">
        //             <div className="form-group">
        //                 <label htmlFor={Constants.TITLE.toLowerCase()} className="label">Title</label>
        //                 <input
        //                     className="form-control"
        //                     id={Constants.TITLE.toLowerCase()}
        //                     aria-describedby="titleHelp"
        //                     placeholder="Enter Title"
        //                     value={title}
        //                     name={Constants.TITLE.toLowerCase()}
        //                     onBlur={() => validate()}
        //                     onChange={(e) => handleChange(e.target)}
        //                 />
        //                 {titleError &&
        //                     <div className="alert alert-danger">{titleError}</div>
        //                 }
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor={Constants.JOB_TYPE} className="label">Job Type</label>
        //                 <input
        //                     className="form-control"
        //                     id={Constants.JOB_TYPE}
        //                     name={Constants.JOB_TYPE}
        //                     placeholder="Job Type"
        //                     value={jobType}
        //                     onBlur={() => validate()}
        //                     onChange={(e) => handleChange(e.target)}

        //                 />
        //                 {jobTypeError &&
        //                     <div className="alert alert-danger">{jobTypeError}</div>
        //                 }
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor={Constants.LOCATION.toLowerCase()} className="label">Location</label>
        //                 <Chips
        //                     value={location}
        //                     placeholder={Constants.LOCATION}
        //                     onChange={(e) => onLocationChange(e)}
        //                     id={Constants.LOCATION.toLowerCase()}
        //                     onBlur={() => validate()}
        //                     suggestions={locations}

        //                 />
        //                 {locationError &&
        //                     <div className="alert alert-danger">{locationError}</div>
        //                 }
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor={Constants.MANDATORY_SKILLS} className="label">Mandatory Skills</label>
        //                 <Chips
        //                     value={mandatorySkills}
        //                     placeholder="Mandatory Skills"
        //                     onChange={(e) => onMandatoryChange(e)}
        //                     id={Constants.MANDATORY_SKILLS}
        //                     onBlur={() => validate()}
        //                     suggestions={skills}

        //                 />
        //                 {mandatorySkillsError &&
        //                     <div className="alert alert-danger">{mandatorySkillsError}</div>
        //                 }
        //             </div>
        //             <div className="form-group">
        //                 <label htmlFor={Constants.GOOD_TO_HAVE_SKILLS} className="label">Good To Have Skills</label>
        //                 <Chips
        //                     placeholder="Good To Have Skills"
        //                     value={goodToHaveSkills}
        //                     onChange={(e) => onGoodToHaveChange(e)}
        //                     id={Constants.GOOD_TO_HAVE_SKILLS}
        //                     suggestions={skills}

        //                 />
        //                 {goodToHaveSkillsError &&
        //                     <div className="alert alert-danger">{goodToHaveSkillsError}</div>
        //                 }
        //             </div>

        //             <div className="form-group">
        //                 <label htmlFor={Constants.NO_OF_POSITIONS} className="label">No Of Positions</label>
        //                 <input
        //                     type="number"
        //                     className="form-control"
        //                     id={Constants.NO_OF_POSITIONS}
        //                     name={Constants.NO_OF_POSITIONS}
        //                     placeholder="No Of Positions"
        //                     value={noOfPositions}
        //                     onBlur={() => validate()}
        //                     onChange={(e) => handleChange(e.target)}
        //                 />
        //                 {noOfPositionsError &&
        //                     <div className="alert alert-danger">{noOfPositionsError}</div>
        //                 }
        //             </div>

        //             <div className="form-group">
        //                 <label htmlFor={Constants.DESCRIPTION.toLowerCase()} className="label">Description</label>
        //                 <textarea className="form-control"
        //                     id={Constants.DESCRIPTION.toLowerCase()}
        //                     name={Constants.DESCRIPTION.toLowerCase()}
        //                     placeholder={Constants.DESCRIPTION}
        //                     value={description}
        //                     onBlur={() => validate()}
        //                     onChange={(e) => handleChange(e.target)} cols="10" rows="5"></textarea>

        //                 {descError &&
        //                     <div className="alert alert-danger">{descError}</div>
        //                 }
        //             </div>

        //             <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)} disabled={submitDisable}>{Constants.SUBMIT}</button>
        //             <button type="reset" className=" btn-danger cancelbtn m-2" onClick={() => resetClicked()} >{Constants.RESET}</button>
        //         </div>
        //     </form >
        // </div>
    );
}

export default AddOpening;