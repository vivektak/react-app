import React, { useState, useEffect } from 'react';
import http from '../../services/httpService';
import MaterialTable from "material-table";
import * as Constants from '../../Constants/Constants';
import Header from './../../../src/Components/private/Header';


const MyTickets = props => {

    const [tickets, setTickets] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [roleData, setRoleData] = useState('');

    const getTickets = () => {
        setIsLoading(true);
        console.log('opening called')
        let url = 'refer/all'

        const data = http.getWithHeader(url)
        data.then(res => {
            setIsLoading(false);
            if (res) {
                setTickets(res.data.data);
                console.log(res.data.data)
            }


        }).catch((error) => {

        });
    }

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            console.log(res.data.data);
            setRoleData(res.data.data);
        })
    }

    useEffect(() => {
        getUserInfo();
        getTickets();
    }, []);

    return (<div>
        <Header {...props} />
        <div className="container-fluid" style={{ margin: "30px 0 15px 0" }}>
            <MaterialTable
                columns={roleData.role === 'admin' ? [
                    { title: 'Job ID', field: "jobId", editable: 'never' },
                    { title: 'Name', render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span>, editable: 'never' },
                    { title: 'Mobile', field: "mobile", editable: 'never' },
                    { title: 'Refer By', field: "jobType", render: row => <span style={{ textTransform: 'capitalize' }}>{row.referBy}</span>, editable: 'never' },
                    { title: 'Status', field: "status", editable: 'onUpdate', lookup: { 'Open': 'Open', 'pending': 'pending', 'No Current Match Found': 'No Current Match Found', 'Invalid Profile': 'Invalid Profile', 'Not Reachable': 'Not Reachable', 'Not Selected': 'Not Selected', 'Resume Shortlisted': 'Resume Shortlisted', 'Offered': 'Offered', 'Deferred': 'Deferred' } },

                ] : [
                        { title: 'Job ID', field: "jobId", editable: 'never' },
                        { title: 'Name', render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span>, editable: 'never' },
                        { title: 'Mobile', field: "mobile", editable: 'never' },
                        { title: 'Refer By', field: "jobType", render: row => <span style={{ textTransform: 'capitalize' }}>{row.referBy}</span>, editable: 'never' },
                        { title: 'Status', field: "status", editable: 'onUpdate', lookup: { 'Open': 'Open', 'pending': 'pending', 'No Current Match Found': 'No Current Match Found', 'Invalid Profile': 'Invalid Profile', 'Not Reachable': 'Not Reachable', 'Not Selected': 'Not Selected', 'Resume Shortlisted': 'Resume Shortlisted', 'Offered': 'Offered', 'Deferred': 'Deferred' } },
                        { title: 'Assign to', field: "assignTo", editable: 'onUpdate', lookup: { 'pooja gupta': 'pooja gupta', 'jai kumar': 'jai kumar', 'Ayushi': 'Ayushi' } },
                        { title: 'Priority', field: "priority", editable: 'onUpdate', lookup: { 'High': 'High', 'Medium': 'Medium', 'Low': 'Low' } },

                    ]}
                data={tickets}
                title='My Tickets'
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            http.patchWithHeader(`refer/status/${newData._id}`, { status: newData.status }).then(res => {
                                getTickets();
                                resolve();
                            })
                        }),
                }}
                options={{
                    actionsColumnIndex: -1,
                    pageSize: 10
                }}
            />
        </div>
    </div>);
}

export default MyTickets;