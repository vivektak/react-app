import React, { useState, useEffect } from 'react';
import Header from './Header';
import localStorage from './../../services/storageService';
import http from '../../services/httpService';
import AddLocation from '../private/popups/AddLocationPopup';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import * as Constants from '../../Constants/Constants';


import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Container,
    Dialog,
    Slide,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Menu,
    MenuItem
} from "@material-ui/core";
import MaterialTable from "material-table";

const Locations = (props) => {

    const [locations, setLocation] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');


    const getLocations = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('location/all', { headers })
        data.then(res => {
            setLocation(res.data.data);
        })
    }

    const handleEdit = (e, data) => {
        togglePopup()
        setEditData(data);
    }

    const handleAdd = () => {
        togglePopup();
        setEditData('');

    }

    const handleDelete = (e, data) => {
        const res = localStorage.get('token')
        let headers = {
            token: res
        }
        http.deleteWithHeader(`location/delete/${data}`, { headers }).then(res => {
            if (res.status === 200) {
                toast.error(Constants.LOCATION_DELETE_SUCCESS);
                getLocations();
            }
        });
    }

    const togglePopup = () => {
        setPopup(!popup)
    }


    useEffect(() => {
        getLocations();

    }, [])
    return (

        <div>
            <Header {...props} />
            <Container>
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >Add Location</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: "Location", field: "name" },

                    ]}
                    data={locations}
                    title="Skills"
                    actions={[
                        {
                            icon: "edit",
                            tooltip: "Edit User",
                            onClick: (event, rowData) => {
                                // Do save operation
                                handleEdit(event, rowData)
                            }
                        },
                        {
                            icon: "delete",
                            tooltip: "Delete User",
                            onClick: (event, rowData) => {
                                // Do save operation
                                handleDelete(event, rowData);
                            }
                        }

                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </Container>
            {
                popup ? <AddLocation popup={popup} togglePopup={togglePopup} getLocations={getLocations} editData={editData}></AddLocation> : null
            }
        </div>
        // <div className="container-fluid">
        //     <Header />
        //     <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>Add</button>
        //     {locations.length > 0 ?
        //         <table className="table table-striped">
        //             <thead>
        //                 <tr>

        //                     <th scope="col">{Constants.LOCATION}</th>
        //                     <th colSpan="2">{Constants.ACTIONS}</th>
        //                 </tr>
        //             </thead>
        //             <tbody>

        //                 {
        //                     locations.map(location =>
        //                         <tr key={location._id}>

        //                             <td>{location.name}</td>

        //                             <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, location)}>{Constants.EDIT}</button></td>
        //                             <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, location._id)}>{Constants.DELETE}</button></td>
        //                         </tr>)
        //                 }

        //             </tbody>
        //         </table>
        //         :
        //         <div className='sweet-loading align-center'>
        //             <Loader
        //                 type="CradleLoader"
        //                 color="#00BFFF"
        //                 height={100}
        //                 width={600}
        //                 timeout={999000} //3 secs

        //             />
        //         </div>
        //     }
        //     {
        //         popup ? <AddLocation togglePopup={togglePopup} getLocations={getLocations} editData={editData}></AddLocation> : null
        //     }
        // </div>
    );
}

export default Locations;