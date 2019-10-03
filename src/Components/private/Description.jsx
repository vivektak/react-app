import React, { useState } from 'react';
import Header from './Header';
import ReferAFriendPopup from '../private/popups/ReferAFriendPopup';
import ViewReferralsPopup from '../private/popups/viewReferredPopup';
import * as Constants from '../../Constants/Constants';

const Description = (props) => {
    console.log(props)
    const { title, location, jobType, skills } = props.location.state.data;
    const [showPopup, setShowPopup] = useState(false);
    const [showReferralPopup, setShowReferralPopup] = useState(false);


    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const toggleRefferalPopup = () => {
        setShowReferralPopup(!showReferralPopup);
    }

    return (
        <div >
            <Header />
            <p><strong>{title}</strong></p>
            <p><strong>{location}</strong></p>
            <p><strong>{jobType}</strong></p>
            <p><strong>{skills}</strong></p>

            <button onClick={() => togglePopup()} className='btn btn-primary cancelbtn'>{Constants.REFER_FRIEND}</button>
            <button onClick={() => toggleRefferalPopup()} className='btn btn-primary cancelbtn m-2'>{Constants.VIEW_REFERRALS}</button>
            {showPopup ? <ReferAFriendPopup togglePopup={togglePopup} data={props.rowData}></ReferAFriendPopup> : null}
            {showReferralPopup ? <ViewReferralsPopup toggleRefferalPopup={toggleRefferalPopup} data={props.location.state}></ViewReferralsPopup> : null}
        </div >
    );
}

export default Description;