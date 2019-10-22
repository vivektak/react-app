import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import Header from './private/Header';
import http from '../services/httpService';

const Dashboard = props => {

    const [totalJobs, setTotalJobs] = useState(0);
    const [frontendJobs, setFrontendJobs] = useState(0);
    const [backendJobs, setBackendJobs] = useState(0);
    const [qaJobs, setQaJobs] = useState(0);
    const [adminJobs, setAdminJobs] = useState(0);
    const [fullstackJobs, setfullstackJobs] = useState(0);

    const handleClick = path => {
        props.history.push('/openings', { path })
    }

    const onBackButtonEvent = (e) => {
        e.preventDefault()
        if (props.history.location.pathname === '/login')
            props.history.go(1);
    }


    const dashboardCount = () => {
        const data = http.getWithHeader('api/dashboard')
        data.then(res => {
            setTotalJobs(res.data.numberOfJobs);
            setFrontendJobs(res.data.frontendCount);
            setBackendJobs(res.data.backendCount);
            setQaJobs(res.data.qaCount);
            setAdminJobs(res.data.adminCount);
            setfullstackJobs(res.data.fullstackCount);
        })
    }

    useEffect(() => {
        window.onpopstate = onBackButtonEvent;
        dashboardCount()
    }, [])

    return (
        <React.Fragment>
            <Header />
            <Card className="dashboard-card total-jobs" onClick={e => handleClick('all')}>
                <CardContent>
                    Total Jobs <h3>{totalJobs}</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card frontend-jobs" onClick={e => handleClick('frontend')}>
                <CardContent>
                    Frontend <h3>{frontendJobs}</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card backend-jobs" onClick={e => handleClick('backend')}>
                <CardContent>
                    Backend <h3>{backendJobs}</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card fullstak frontend-jobs" onClick={e => handleClick('fullstack')}>
                <CardContent>
                    FullStack <h3>{fullstackJobs}</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card qa-jobs" onClick={e => handleClick('qa')}>
                <CardContent>
                    QA <h3>{qaJobs}</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card admin-jobs" onClick={e => handleClick('admin')}>
                <CardContent>
                    Administrative <h3>{adminJobs}</h3>
                </CardContent>
            </Card>
        </React.Fragment>
    );
}

export default Dashboard;