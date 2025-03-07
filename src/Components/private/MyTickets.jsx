import React, { useState, useEffect } from 'react';
import http from '../../services/httpService';
import MaterialTable from "material-table";
import * as Constants from '../../Constants/Constants';
import Header from './../../../src/Components/private/Header';
import { error } from '../../services/notificationService';
import { success } from './../../services/notificationService';

const MyTickets = props => {

    const [tickets, setTickets] = useState([])
    const [hrData, setHrData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [roleData, setRoleData] = useState('');

    const getTickets = () => {
        setIsLoading(true);
        let url = 'refer/all'
        const data = http.getWithHeader(url)
        data.then(res => {
            setIsLoading(false);
            if (res) {
                setTickets(res.data.data);
            }
        }).catch((error) => {

        });
    }

    const getHrDetails = () => {
        setIsLoading(true);
        let url = 'user/allhr'
        const data = http.getWithHeader(url)
        data.then(res => {
            setIsLoading(false);
            if (res) {
                setHrData(res.data.data);
            }
        }).catch((error) => {

        });
    }

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            setRoleData(res.data.data);
            if (res.data.data.role === 'superadmin' || res.data.data.role === 'admin') {
                getTickets();
                getHrDetails();
            }
            else {
                error('UnAuthorized Access')
                props.history.replace('/login')
            }
        })
    }

    const handleDelete = (e, rowData) => {
        http.deleteWithHeader(`refer/delete/${rowData._id}`).then(res => {
            if (res && res.status === 200) {
                success(Constants.OPENING_DELETE_SUCCESS);
                getTickets();
                getHrDetails();

            }
        }).catch(error => {

        });
    }

    useEffect(() => {
        getUserInfo();

    }, []);

    return (<div>
        <Header {...props} />
        <div className="container-fluid" style={{ margin: "30px 0 15px 0" }}>
            <MaterialTable
                columns={roleData.role === 'admin' ? [
                    { title: 'Job ID', field: "jobId", editable: 'never' },
                    { title: 'Name', field: "name", render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span>, editable: 'never' },
                    { title: 'Mobile', field: "mobile", editable: 'never' },
                    { title: 'Experience(in years)', field: "experience", editable: 'never' },
                    { title: 'Refer By', field: "referBy.firstName", render: row => <span style={{ textTransform: 'capitalize' }}>{row.referBy.firstName}</span>, editable: 'never' },
                    { title: 'Status', field: "status", editable: 'onUpdate', lookup: { 'Open': 'Open', 'Pending': 'Pending', 'No Current Match Found': 'No Current Match Found', 'Invalid Profile': 'Invalid Profile', 'Not Reachable': 'Not Reachable', 'Not Selected': 'Not Selected', 'Resume Shortlisted': 'Resume Shortlisted', 'Offered': 'Offered', 'Deferred': 'Deferred' } },

                ] : [
                        { title: 'Job ID', field: "jobId", editable: 'never' },
                        { title: 'Name', field: "name", render: row => <span style={{ textTransform: 'capitalize' }}>{row.name}</span>, editable: 'never' },
                        { title: 'Mobile', field: "mobile", editable: 'never' },
                        { title: 'Experience(in years)', field: "experience", editable: 'never' },
                        { title: 'Refer By', field: "referBy.firstName", render: row => <span style={{ textTransform: 'capitalize' }}>{row.referBy.firstName}</span>, editable: 'never' },
                        { title: 'Status', field: "status", editable: 'onUpdate', lookup: { 'Open': 'Open', 'pending': 'pending', 'No Current Match Found': 'No Current Match Found', 'Invalid Profile': 'Invalid Profile', 'Not Reachable': 'Not Reachable', 'Not Selected': 'Not Selected', 'Resume Shortlisted': 'Resume Shortlisted', 'Offered': 'Offered', 'Deferred': 'Deferred' } },
                        { title: 'Assign to', field: 'assignedTo', editable: 'onUpdate', lookup: hrData },
                        { title: 'Priority', field: "priority", editable: 'onUpdate', lookup: { 'High': 'High', 'Medium': 'Medium', 'Low': 'Low' } },

                    ]}
                data={tickets}
                title='My Tickets'
                editable={{
                    onRowUpdate: (newData, oldData) =>

                        new Promise((resolve, reject) => {
                            console.log(newData)
                            if (oldData.status === 'Not Selected') {
                                error('you cant update this record as this candidate is not selected')
                                getTickets();
                                resolve()

                            } else {
                                http.patchWithHeader(`refer/status/${newData._id}`, { status: newData.status, priority: newData.priority, assignedTo: newData.assignedTo }).then(res => {
                                    getTickets();
                                    resolve();
                                })
                            }
                        }),
                }}
                actions={roleData.role === 'superadmin' ? [

                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => {
                            handleDelete(event, rowData)
                        }
                    },
                ] : []}
                options={{
                    actionsColumnIndex: -1,
                    pageSize: 10
                }}
            />
        </div>
    </div>);
}

export default MyTickets;