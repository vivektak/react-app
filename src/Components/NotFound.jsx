import React from 'react';
import * as Constants from '../Constants/Constants'
import { Card, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const NotFound = props => {

    const handleGoBack = e => {
        props.history.goBack();
    }

    return (
        <div className="container-fluid">
            <Card style={{ marginTop: "20px" }}>
                <CardContent>
                    <img src='/404.png' alt='404- page' />
                    <div>
                        <strong><p>Maybe the page you are looking for has been removed, or you typed in the wrong URL</p></strong>
                    </div>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button style={{
                        color: '#007bff',
                        textDecoration: 'none', backgroundColor: 'transparent'
                    }} onClick={e => handleGoBack()} > Go back</Button>
                </CardActions>
            </Card>
        </div>
    )
}


export default NotFound;