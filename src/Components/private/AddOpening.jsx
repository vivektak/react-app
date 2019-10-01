import React, { useState, useEffect } from 'react';
import Chips from 'react-chips'
import Header from './Header';
import localStorage from '../../services/storageService'
import http from '../../services/httpService';
import { toast } from 'react-toastify';
import * as Constants from '../../Constants/Constants';




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
    const [submitDisable, setSubmitDisable] = useState(false);

    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [noOfPositionsError, setNoOfPositionsError] = useState('');
    const [mandatorySkillsError, setMandatorySkillsError] = useState('');
    const [goodToHaveSkillsError, setGoodToHaveSkillsError] = useState('');





    const getSkills = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('skill/all', { headers })
        data.then(res => {
            console.log(res.data.data)

            let data = [];
            res.data.data.map(res => {
                console.log(res)
                data.push(res.name);
            })
            console.log(data)
            setSkills(data);
        })

    }

    const getLocations = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('location/all', { headers })
        data.then(res => {
            console.log(res)
            let data = [];
            res.data.data.map(res => {
                console.log(res)
                data.push(res.name);
            })
            console.log(data)
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

    const handleChange = e => {
        if (e.name === Constants.TITLE.toLowerCase())
            setTitle(e.value);
        if (e.name === Constants.DESCRIPTION.toLowerCase())
            setDescription(e.value);
        if (e.name === Constants.JOB_TYPE)
            setJobType(e.value);
        if (e.name === Constants.LOCATION.toLowerCase())
            setLocation(e.value);
        if (e.name === Constants.NO_OF_POSITIONS)
            setNoOfPositions(e.value);

    }

    const onMandatoryChange = e => {
        setMandatorySkills(e);
    }

    const onLocationChange = e => {
        setLocation(e);
    }

    const onGoodToHaveChange = e => {
        setGoodToHaveSkills(e);
    }


    const handleSubmit = e => {
        setSubmitDisable(true);
        e.preventDefault();
        const isValid = validate();
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
            const res = localStorage.get(Constants.TOKEN)
            let headers = {
                token: res
            }


            if (props.match.params.id) {
                http.putWithHeader(`job/edit/${props.match.params.id}`, data, { headers }).then(res => {
                    toast.success(Constants.OPENING_EDIT_SUCCESS);
                    props.history.push(`/${Constants.OPENINGS}`);
                    setSubmitDisable(false);
                });
            } else {
                http.postWithHeader('job/add', data, { headers }).then(res => {
                    toast.success(Constants.OPENING_ADD_SUCCESS);
                    props.history.push(`/${Constants.OPENINGS}`);
                    setSubmitDisable(false);

                });
            }


        }
    }



    useEffect(() => {
        getSkills();
        getLocations();
        if (props.match.params.id) {
            const data = props.location.state.data;
            data.map(dataToEdit => {
                setTitle(dataToEdit.title);
                setDescription(dataToEdit.description);
                setLocation(dataToEdit.location);
                setJobType(dataToEdit.jobType);
                setNoOfPositions(dataToEdit.noOfPositions);
                setMandatorySkills(dataToEdit.mandatorySkills);
                setGoodToHaveSkills(dataToEdit.goodToHaveSkills);

            })
        }
    }, []);

    const resetClicked = () => {
        setTitle('');
        setMandatorySkills([]);
        setGoodToHaveSkills([]);
        setLocation('');
        setNoOfPositions(0);
        setJobType('');
        setDescription('');
    }

    const inlinestyle = {
        backgroundColor: "#f1f1f1"
    }

    return (
        <div>
            <Header />
            <form  >
                <div className="container" style={inlinestyle} >
                    <span className="header">{props.match.params.id ? 'Edit' : 'Add'} Opening</span>
                </div>
                <div className="container">
                    <div className="form-group">
                        <label htmlFor={Constants.TITLE.toLowerCase()} className="label">Title</label>
                        <input
                            className="form-control"
                            id={Constants.TITLE.toLowerCase()}
                            aria-describedby="titleHelp"
                            placeholder="Enter Title"
                            value={title}
                            name={Constants.TITLE.toLowerCase()}
                            onBlur={() => validate()}
                            onChange={(e) => handleChange(e.target)}
                        />
                        {titleError &&
                            <div className="alert alert-danger">{titleError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor={Constants.JOB_TYPE} className="label">Job Type</label>
                        <input
                            className="form-control"
                            id={Constants.JOB_TYPE}
                            name={Constants.JOB_TYPE}
                            placeholder="Job Type"
                            value={jobType}
                            onBlur={() => validate()}
                            onChange={(e) => handleChange(e.target)}

                        />
                        {jobTypeError &&
                            <div className="alert alert-danger">{jobTypeError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor={Constants.LOCATION.toLowerCase()} className="label">Location</label>
                        <Chips
                            value={location}
                            placeholder={Constants.LOCATION}
                            onChange={(e) => onLocationChange(e)}
                            id={Constants.LOCATION.toLowerCase()}
                            onBlur={() => validate()}
                            suggestions={locations}

                        />
                        {locationError &&
                            <div className="alert alert-danger">{locationError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor={Constants.MANDATORY_SKILLS} className="label">Mandatory Skills</label>
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
                    </div>
                    <div className="form-group">
                        <label htmlFor={Constants.GOOD_TO_HAVE_SKILLS} className="label">Good To Have Skills</label>
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
                    </div>

                    <div className="form-group">
                        <label htmlFor={Constants.NO_OF_POSITIONS} className="label">No Of Positions</label>
                        <input
                            type="number"
                            className="form-control"
                            id={Constants.NO_OF_POSITIONS}
                            name={Constants.NO_OF_POSITIONS}
                            placeholder="No Of Positions"
                            value={noOfPositions}
                            onBlur={() => validate()}
                            onChange={(e) => handleChange(e.target)}
                        />
                        {noOfPositionsError &&
                            <div className="alert alert-danger">{noOfPositionsError}</div>
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor={Constants.DESCRIPTION.toLowerCase()} className="label">Description</label>
                        <textarea className="form-control"
                            id={Constants.DESCRIPTION.toLowerCase()}
                            name={Constants.DESCRIPTION.toLowerCase()}
                            placeholder={Constants.DESCRIPTION}
                            value={description}
                            onBlur={() => validate()}
                            onChange={(e) => handleChange(e.target)} cols="10" rows="5"></textarea>

                        {descError &&
                            <div className="alert alert-danger">{descError}</div>
                        }
                    </div>

                    <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)} disabled={submitDisable}>{Constants.SUBMIT}</button>
                    <button type="reset" className=" btn-danger cancelbtn m-2" onClick={() => resetClicked()} >{Constants.RESET}</button>
                </div>
            </form >
        </div>
    );
}

export default AddOpening;