import React, { useState, useEffect } from 'react';
import '../../../styles/popup.css'
import localStorage from '../../../services/storageService';
import http from '../../../services/httpService';
import * as Constants from '../../../Constants/Constants';


const ViewReferredPopup = (props) => {

    const [referrals, setReferrals] = useState([]);

    const getReferrals = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }
        console.log(props.referralData)
        const data = http.getWithHeader(`refer/${props.referralData._id}`, { headers })
        data.then(res => {
            setReferrals(res.data.data);
        })
    }

    const closePopup = () => {
        props.toggleReferrals();
    }

    useEffect(props => {
        getReferrals();
    })



    return (
        <div className='popup'>
            <div className='popup\_inner'>
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile Number</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                referrals.map(referral =>
                                    <tr key={referral._id}>

                                        <td>{referral.name}</td>
                                        <td>{referral.email}</td>
                                        <td>{referral.mobile}</td>

                                    </tr>)
                            }

                        </tbody>
                    </table>

                    <button className="btn btn-danger cancelbtn" onClick={() => closePopup()} >{Constants.CLOSE}</button>
                </div>
            </div>
        </div>

    );
}

export default ViewReferredPopup;