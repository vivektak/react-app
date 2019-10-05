import React, { useEffect, useState, useContext, useRef } from 'react';
import { userContext } from '../../services/Context';
import Header from './Header';
//import { Link } from 'react-router-dom';
//import localStorage from '../../services/storageService'
import http from "../../services/httpService";
import DescriptionPopup from '../private/popups/DescriptionPopup';
//import { toast } from 'react-toastify';
//import Loader from 'react-loader-spinner';
import ViewReferredPopup from './popups/viewReferredPopup';
import * as Constants from '../../Constants/Constants';




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
//import MenuIcon from "@material-ui/icons/Menu";
import MaterialTable from "material-table";
//import AccountCircle from '@material-ui/icons/AccountCircle';
import AddOpening from './AddOpening';
import ConfirmPopup from './popups/ConfirmPopup';
import { toBase64 } from '../../services/commonHandler';
import { success } from '../../services/notificationService';



const Openings = props => {
    useEffect(props => {
        getOpenings();
    }, []);

    //const { data, setData } = useContext(userContext);
    const [openModal, setOpenModal] = useState(false);

    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [descData, setDescData] = useState({});
    //const [referralData, setReferralData] = useState({});
    const [showReferralPopup, setShowReferralPopup] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [excelImport, setExcelImport] = useState('');
    const [Opening, setOpening] = useState([]);
    const [rowData, setRowData] = useState([]);

    const fileInput = useRef();


    const handleEdit = (e, rowData) => {
        setRowData(rowData);
        setOpenModal(true);
    }

    const handleDelete = (e) => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        http.deleteWithHeader(`job/delete/${rowData._id}`).then(res => {
            if (res && res.status === 200) {
                success(Constants.OPENING_DELETE_SUCCESS);
                getOpenings();
                setIsDelete(false);
            }
        });

    }

    const togglePopup = () => {
        setDescriptionPopup(!descriptionPopup)
    }

    const handleAdd = () => {
        setRowData([]);
        setOpenModal(true)
    }

    const getOpenings = () => {
        // const res = localStorage.get(Constants.TOKEN)
        // let headers = {
        //     token: res
        // }

        const data = http.getWithHeader('job/latest?count=5&page=1')
        data.then(res => {
            console.log(res.data.data);
            // let manSkills = '';
            // if (res.data.data.length > 0) {
            //     res.data.data.map(data => {
            //         if (data.mandatorySkills.length > 1) {

            //             data.mandatorySkills.map(skills => {

            //                 manSkills.concat(skills + ',');
            //             });
            //             data.mandatorySkills = manSkills;
            //         }
            //     })
            // }


            setOpening(res.data.data);
        })

    }

    const handleDetailsView = (e, rowData) => {
        setRowData(rowData);
        togglePopup();

    }

    // const handleDetails = (e, data) => {
    //     setDescData(data);
    //     togglePopup();
    // }


    const toggleReferrals = (e, data) => {
        setRowData(data);
        setShowReferralPopup(!showReferralPopup);
    }


    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggleDeletePopup = () => {
        setIsDelete(false);
    }

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
        http.postWithHeader('skill/bulk', { file: data }).then(res => {
            console.log(res);
            getOpenings();
        })
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
            <div className="container-fluid" >
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
                    >Add Opening</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: "ID", field: "_id" },
                        { title: "Title", field: "title" },
                        { title: "Job Type", field: "jobType" },
                        { title: "Location", field: "location" },
                        { title: "Mandatory Skills", field: "mandatorySkills" },
                        { title: "Good To Have Skills", field: "goodToHaveSkills" },
                        { title: "Number of Positions", field: "noOfPositions" },

                    ]}
                    data={Opening}
                    title="Job Openings"
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
                                setRowData(rowData);
                            }
                        },
                        {
                            icon: "remove_red_eye",
                            tooltip: "View Details",
                            onClick: (event, rowData) => {
                                // Do save operation
                                handleDetailsView(event, rowData);
                            }
                        },
                        {
                            icon: "people",
                            tooltip: "View Referred",
                            onClick: (event, rowData) => {
                                // Do save operation
                                toggleReferrals(event, rowData);
                            }
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {openModal ? <AddOpening getOpenings={getOpenings} handleCloseModal={handleCloseModal} openModal={openModal} rowData={rowData} {...props}></AddOpening> : null}
            {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} rowData={rowData} descriptionPopup={descriptionPopup}></DescriptionPopup> : null}
            {showReferralPopup ? <ViewReferredPopup toggleReferrals={toggleReferrals} rowData={rowData} showReferralPopup={showReferralPopup}> </ViewReferredPopup> : null}
            {isDelete ? <ConfirmPopup handleDelete={handleDelete} toggleDeletePopup={toggleDeletePopup}></ConfirmPopup> : null}

        </div>



        //     <div className="container-fluid" >
        //         <Header />
        //         {data && data.role === 'admin' ? <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>{Constants.ADD}</button> : null}
        //         {
        //             Opening.length > 0 ?
        //                 <table className="table table-striped">
        //                     <thead>
        //                         <tr>
        //                             <th scope="col">Id</th>
        //                             <th scope="col">Title</th>
        //                             <th scope="col">Job Type</th>
        //                             <th scope="col">Location</th>
        //                             <th scope="col">Mandatory Skills</th>
        //                             <th scope="col">Good to Have Skills</th>
        //                             <th scope="col">No of Positions</th>
        //                             <th colSpan="3">Actions</th>
        //                         </tr>
        //                     </thead>
        //                     <tbody>

        //                         {
        //                             Opening.map(opening =>
        //                                 <tr key={opening._id}>
        //                                     <td>{opening._id}</td>
        //                                     <td>{opening.title}</td>
        //                                     <td>{opening.jobType}</td>
        //                                     <td>{opening.location}</td>
        //                                     <td>{opening.mandatorySkills}</td>
        //                                     <td>{opening.goodToHaveSkills}</td>
        //                                     <td>{opening.noOfPositions}</td>
        //                                     {data && data.role === 'admin' ? <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, opening._id)}>{Constants.EDIT}</button></td> : null}
        //                                     {data && data.role === 'admin' ? <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, opening._id)}>{Constants.DELETE}</button></td> : null}
        //                                     {data && data.role === 'admin' ? <td><button className="btn btn-info cancelbtn" onClick={e => toggleReferrals(e, opening)}>{Constants.VIEW_REFERRALS}</button></td> : null}
        //                                     <td><button className="btn btn-info cancelbtn" onClick={e => handleDetails(e, opening)}>{Constants.DETAILS}</button></td>
        //                                 </tr>)
        //                         }

        //                     </tbody>
        //                 </table>
        //                 :
        //                 <div className='sweet-loading align-center'>
        //                     <Loader
        //                         type="CradleLoader"
        //                         color="#00BFFF"
        //                         height={100}
        //                         width={600}
        //                         timeout={30000} //3 secs

        //                     />
        //                 </div>
        //         };

        // {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} descData={descData}></DescriptionPopup> : null}
        //         {showReferralPopup ? <ViewReferredPopup toggleReferrals={toggleReferrals} referralData={referralData}> </ViewReferredPopup> : null}
        //     </div >
    );
}

export default Openings;