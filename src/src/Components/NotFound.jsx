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
                    <img src='/error_404.jpg' alt='404- page' />
                    {/* <span className="card-title">Page not found :(</span> */}
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
                    {/* <a href="" onClick={e => handleGoBack()}>Go back</a> */}
                    <Link to='/openings'>Go to homepage</Link>
                </CardActions>
            </Card>
        </div>
        // <div id="main" class="row">
        //     <div class="col s12">
        //         <div class="card">
        //             <div class="card-content">
        //                 <span class="card-title">Page not found :(</span>
        //                 <p>Maybe the page you are looking for has been removed, or you typed in the wrong URL</p>
        //             </div>
        //             <div class="card-action">
        //                 <a class="waves-effect waves-green" href="#">Go back</a>
        //                 <a class="waves-effect waves-green" href="#">Go to homepage</a>
        //                 <a class="waves-effect waves-green" href="#">View sitemap</a>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}


export default NotFound;