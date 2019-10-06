import React, { useState, useEffect, useRef } from 'react';
import Header from './Header';
//import localStorage from './../../services/storageService';
import http from '../../services/httpService';
import AddLocation from '../private/popups/AddLocationPopup';
//import { toast } from 'react-toastify';
//import Loader from 'react-loader-spinner';
import * as Constants from '../../Constants/Constants';
import { toBase64 } from '../../services/commonHandler.js'

import {
    // AppBar,
    // Toolbar,
    // IconButton,
    // Typography,
    Button,
    // Container,
    // Dialog,
    // Slide,
    // DialogTitle,
    // DialogContent,
    // DialogContentText,
    // DialogActions,
    // Menu,
    // MenuItem
} from "@material-ui/core";
import MaterialTable from "material-table";
import ConfirmPopup from './popups/ConfirmPopup';
import { success } from '../../services/notificationService';


const Locations = (props) => {

    const [locations, setLocation] = useState([]);
    const [popup, setPopup] = useState(false);
    const [editData, setEditData] = useState('');
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');

    const fileInput = useRef();

    const getLocations = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        const data = http.getWithHeader('location/all')
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

    const handleDelete = (e) => {
        // const res = localStorage.get('token')
        // let headers = {
        //     token: res
        // }
        http.deleteWithHeader(`location/delete/${editData._id}`).then(res => {
            if (res.status === 200) {
                success(Constants.LOCATION_DELETE_SUCCESS);
                getLocations();
                setIsDelete(false);
            }
        });
    }

    const togglePopup = () => {
        setPopup(!popup)
    }

    // const toBase64 = file => new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = () => resolve(reader.result);
    //     reader.onerror = error => reject(error);
    // });

    const onChange = async (e) => {
        console.log(e);
        console.log(e.target.files[0]);
        const excel = await toBase64(e.target.files[0]);
        setExcelImport(excel);
        importExcelApi(excel);
    }

    const importExcelApi = (data) => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }
        http.postWithHeader('location/bulk', { file: data }).then(res => {
            console.log(res);
            getLocations();
        })
    }


    useEffect(() => {
        getLocations();

    }, []);


    const toggleDeletePopup = () => {
        setIsDelete(false);
    }

    const handleImport = () => {
        console.log(fileInput.current)
        fileInput.current.click();
    }

    const handleExport = () => {
        console.log(fileInput.current);
    }

    return (

        <div>
            <Header {...props} />
            <div className="container-fluid">
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>
                    <input
                        ref={fileInput}
                        style={{ display: "none" }}
                        id="standard-file"
                        label="Choose File"
                        type="file"
                        name="file"
                        accept=".xls,.xlsx"
                        onChange={e => {
                            onChange(e);
                        }}
                    />
                    <Button
                        onClick={() => handleImport()}
                        color="secondary"
                        variant="contained"
                    >Import Excel</Button>
                    <Button
                        onClick={() => handleExport()}
                        color="secondary"
                        variant="contained"
                        className="m-2"
                    >Export Excel</Button>
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
                    title="Locations"
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
                                //handleDelete(event, rowData);
                                setIsDelete(true);
                                setEditData(rowData);
                            }
                        }

                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {
                popup ? <AddLocation popup={popup} togglePopup={togglePopup} getLocations={getLocations} editData={editData}></AddLocation> : null
            }
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}
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