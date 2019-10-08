import React from 'react';
import { Card, CardContent } from '@material-ui/core';
import Header from './private/Header';

const Dashboard = props => {

    const handleClick = path => {
        console.log(path);
        props.history.replace('/openings')
    }
    return (
        <React.Fragment>
            <Header />
            <Card className="dashboard-card total-jobs" onClick={e => handleClick('/all')}>
                <CardContent>
                    Total Jobs <h3>544</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card frontend-jobs" onClick={e => handleClick('/frontend')}>
                <CardContent>
                    Frontend <h3>544</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card backend-jobs" onClick={e => handleClick('/backend')}>
                <CardContent>
                    Backend <h3>544</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card qa-jobs" onClick={e => handleClick('/qa')}>
                <CardContent>
                    QA <h3>544</h3>
                </CardContent>
            </Card>
            <Card className="dashboard-card admin-jobs" onClick={e => handleClick('admin')}>
                <CardContent>
                    Administrative <h3>544</h3>
                </CardContent>
            </Card>
            {/* </div> */}
        </React.Fragment>
    );
}

export default Dashboard;