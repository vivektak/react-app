import React, { useEffect, useState, useContext } from 'react';
import Header from './Header';

import localStorage from '../../services/storageService'
import http from "../../services/httpService";
import DescriptionPopup from '../private/popups/DescriptionPopup';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ViewReferredPopup from './popups/viewReferredPopup';
import * as Constants from '../../Constants/Constants';
import { userContext } from '../../services/Context';


const Openings = (props) => {

    const [Opening, setOpening] = useState([]);
    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [descData, setDescData] = useState({});
    const [referralData, setReferralData] = useState({});

    const [showReferralPopup, setShowReferralPopup] = useState(false);

    const { data, setData } = useContext(userContext);

    const handleEdit = (e, id) => {
        const data = Opening.filter(opening => opening._id === id);
        props.history.push(`/openings/${id}`, { data })
    }

    const handleDelete = (e, id) => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }
        try {

        } catch{

        }
        http.deleteWithHeader(`job/delete/${id}`, { headers }).then(res => {
            if (res && res.status === 200) {
                toast.error(Constants.OPENING_DELETE_SUCCESS);
                getOpenings();
            }
        });

    }

    const togglePopup = () => {
        setDescriptionPopup(!descriptionPopup)
    }

    const handleAdd = () => {
        props.history.push('/add-opening')
    }

    const getOpenings = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('job/latest?count=5&page=1', { headers })
        data.then(res => {
            setOpening(res.data.data);
        })

    }

    const handleDetails = (e, data) => {
        setDescData(data);
        togglePopup();
    }

    const toggleReferrals = (e, data) => {
        setReferralData(data);
        setShowReferralPopup(!showReferralPopup);
    }


    useEffect(() => {
        getOpenings();
    }, []);


    return (
        <div className="container-fluid">
            <Header />
            {data && data.role === 'admin' ? <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>{Constants.ADD}</button> : null}
            {Opening.length > 0 ?
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Title</th>
                            <th scope="col">Job Type</th>
                            <th scope="col">Location</th>
                            <th scope="col">Mandatory Skills</th>
                            <th scope="col">Good to Have Skills</th>
                            <th scope="col">No of Positions</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            Opening.map(opening =>
                                <tr key={opening._id}>
                                    <td>{opening._id}</td>
                                    <td>{opening.title}</td>
                                    <td>{opening.jobType}</td>
                                    <td>{opening.location}</td>
                                    <td>{opening.mandatorySkills}</td>
                                    <td>{opening.goodToHaveSkills}</td>
                                    <td>{opening.noOfPositions}</td>
                                    {data && data.role === 'admin' ? <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, opening._id)}>{Constants.EDIT}</button></td> : null}
                                    {data && data.role === 'admin' ? <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, opening._id)}>{Constants.DELETE}</button></td> : null}
                                    {data && data.role === 'admin' ? <td><button className="btn btn-info cancelbtn" onClick={e => toggleReferrals(e, opening)}>{Constants.VIEW_REFERRALS}</button></td> : null}
                                    <td><button className="btn btn-info cancelbtn" onClick={e => handleDetails(e, opening)}>{Constants.DETAILS}</button></td>
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
                        timeout={30000} //3 secs

                    />
                </div>
            };

            {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} descData={descData}></DescriptionPopup> : null}
            {showReferralPopup ? <ViewReferredPopup toggleReferrals={toggleReferrals} referralData={referralData}> </ViewReferredPopup> : null}
        </div>
    );
}

export default Openings;