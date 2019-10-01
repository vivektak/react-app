import React, { useState } from 'react';
import ReferAFriendPopup from './ReferAFriendPopup';
import http from '../../../services/httpService';
import localStorage from '../../../services/storageService';
import { toast } from 'react-toastify';
import * as Constants from '../../../Constants/Constants';

const DescriptionPopup = (props) => {

    const { title, location, jobType, skills } = props.descData;
    const [showPopup, setShowPopup] = useState(true);
    const [addEditDisable, setAddEditDisable] = useState(false);


    const referTogglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleSubmit = (data, header) => {
        setAddEditDisable(true);
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        http.postWithHeader('refer', data, { headers }).then(res => {
            if (res.status === 200 || res.status === 201) {
                toast.success(Constants.REFERRED_SUCCESS)
                props.togglePopup();
                setAddEditDisable(false);
            }
        });

    }



    return (
        <div className='popup'>
            <div className='popup\_inner'>
                <div className="container-fluid">

                    {showPopup ? <React.Fragment><p><strong>{title}</strong></p>
                        <p><strong>{location}</strong></p>
                        <p><strong>{jobType}</strong></p>
                        <p><strong>{skills}</strong></p>
                        <button onClick={() => referTogglePopup()} className='btn btn-primary cancelbtn' disabled={addEditDisable}>{Constants.REFER_FRIEND}</button>
                        <button onClick={props.togglePopup} className="btn btn-danger cancelbtn">{Constants.CLOSE}</button>
                    </React.Fragment>
                        :
                        <ReferAFriendPopup handleSubmit={handleSubmit} togglePopup={props.togglePopup} data={props.descData}></ReferAFriendPopup>}
                </div >
            </div>
        </div >
    );
}

export default DescriptionPopup;