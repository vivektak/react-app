import React, { useState, useEffect } from 'react';
import Chips from 'react-chips'
import Header from './Header';
import localStorage from '../services/storageService'
import http from '../services/httpService';


const AddOpening = (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [jobType, setJobType] = useState('');
    const [location, setLocation] = useState('');
    const [noOfPositions, setNoOfPositions] = useState(0);
    const [chips, setChips] = useState([]);

    const [titleError, setTitleError] = useState('');
    const [descError, setDescError] = useState('');
    const [jobTypeError, setJobTypeError] = useState('');
    const [locationError, setLocationError] = useState('');
    const [noOfPositionsError, setNoOfPositionsError] = useState('');
    const [chipsError, setChipsError] = useState('');




    const validate = e => {
        if (title === '') {
            setTitleError('Title is Required');
            return false;
        } else {
            setTitleError('')
        }

        if (description === '') {
            setDescError('Description is Required');
            return false;
        } else {
            setDescError('');
        }

        if (jobType === '') {
            setJobTypeError('Job Type is Required');
        } else {
            setJobTypeError('');
        }

        if (location === '') {
            setLocationError('Location is Required');
            return false;
        } else {
            setLocationError('')
        }

        if (noOfPositions === 0) {
            setNoOfPositionsError("Number of Positions can't be 0");
            return false;
        } else {
            setNoOfPositionsError('')
        }

        if (chips.length === 0) {
            setChipsError("Skills Required");
            return false;
        } else {
            setChipsError('');
        }
    }

    const handleChange = e => {
        if (e.name === 'title')
            setTitle(e.value);
        if (e.name === 'description')
            setDescription(e.value);
        if (e.name === 'jobType')
            setJobType(e.value);
        if (e.name === 'location')
            setLocation(e.value);
        if (e.name === 'noOfPositions')
            setNoOfPositions(e.value);

    }

    const onChange = e => {
        setChips(e);
    }


    const handleSubmit = e => {

        e.preventDefault();
        const isValid = validate();
        if (isValid !== false) {
            let data = {
                title,
                description,
                jobType,
                location,
                noOfPositions,
                skills: chips
            }

            const res = localStorage.get('token')
            let headers = {
                token: res
            }
            http.postWithHeader('job/add', data, { headers }).then(res => {
                props.history.push('/openings');
            });

        }
    }



    useEffect(() => {
        if (props.match.params.id) {
            const data = props.location.state.data;
            data.map(dataToEdit => {
                setTitle(dataToEdit.title);
                setDescription(dataToEdit.description);
                setLocation(dataToEdit.location);
                setJobType(dataToEdit.jobType);
                setNoOfPositions(dataToEdit.noOfPositions);
                setChips(dataToEdit.skills);

            })
        }
    }, []);

    const resetClicked = () => {
        setTitle('');
        setChips([]);
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
                        <label htmlFor="title" className="label">Title</label>
                        <input
                            className="form-control"
                            id="title"
                            aria-describedby="titleHelp"
                            placeholder="Enter Title"
                            value={title}
                            name="title"
                            onChange={(e) => handleChange(e.target)}
                        />
                        {titleError &&
                            <div className="alert alert-danger">{titleError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="description" className="label">Description</label>
                        <input
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => handleChange(e.target)}

                        />
                        {descError &&
                            <div className="alert alert-danger">{descError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="jobType" className="label">Job Type</label>
                        <input
                            className="form-control"
                            id="jobType"
                            name="jobType"
                            placeholder="Job Type"
                            value={jobType}
                            onChange={(e) => handleChange(e.target)}

                        />
                        {jobTypeError &&
                            <div className="alert alert-danger">{jobTypeError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="location" className="label">Location</label>
                        <input
                            className="form-control"
                            id="location"
                            name="location"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => handleChange(e.target)}

                        />
                        {locationError &&
                            <div className="alert alert-danger">{locationError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="skills" className="label">Skills</label>
                        <Chips
                            value={chips}
                            onChange={(e) => onChange(e)}
                            id="skills"
                            suggestions={["HTML5", "CSS3", "Bootstrap", "Angular 1", "Angular 2", "Angular 4", "Angular 6", "Angular 7", "Angular 8", "Node JS", "React JS", "javascript", ""]}

                        />
                        {chipsError &&
                            <div className="alert alert-danger">{chipsError}</div>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="noOfPositions" className="label">No Of Positions</label>
                        <input
                            type="number"
                            className="form-control"
                            id="noOfPositions"
                            name="noOfPositions"
                            placeholder="No Of Positions"
                            value={noOfPositions}
                            onChange={(e) => handleChange(e.target)}
                        />
                        {noOfPositionsError &&
                            <div className="alert alert-danger">{noOfPositionsError}</div>
                        }
                    </div>

                    <button type="button" className="cancelbtn" onClick={(e) => handleSubmit(e)}>
                        Submit
            </button>
                    <button type="reset" className=" btn-danger cancelbtn m-2" onClick={() => resetClicked()} >Reset</button>
                </div>
            </form >
        </div>
    );
}

export default AddOpening;