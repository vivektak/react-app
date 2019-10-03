import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../services/Context';
import Header from './Header';
import { Link } from 'react-router-dom';
import localStorage from '../../services/storageService'
import http from "../../services/httpService";
import DescriptionPopup from '../private/popups/DescriptionPopup';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';
import ViewReferredPopup from './popups/viewReferredPopup';
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
import MenuIcon from "@material-ui/icons/Menu";
import MaterialTable from "material-table";
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddOpening from './AddOpening';



const Openings = props => {
    useEffect(props => {
        getOpenings();
    }, []);

    const { data, setData } = useContext(userContext);
    const [openModal, setOpenModal] = useState(false);

    const [descriptionPopup, setDescriptionPopup] = useState(false);
    const [descData, setDescData] = useState({});
    const [referralData, setReferralData] = useState({});
    const [showReferralPopup, setShowReferralPopup] = useState(false);



    const [Opening, setOpening] = useState([]);
    const [rowData, setRowData] = useState([]);
    // const [openModal, setOpenModal] = useState(false);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);


    // const handleMenu = event => {
    //     setAnchorEl(event.currentTarget);
    // };


    // const handleClose = () => {
    //     setAnchorEl(null);
    // };



    const handleEdit = (e, rowData) => {
        setRowData(rowData);
        setOpenModal(true);
    }

    const handleDelete = (e, rowData) => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        http.deleteWithHeader(`job/delete/${rowData._id}`, { headers }).then(res => {
            if (res && res.status === 200) {
                toast.error(Constants.OPENING_DELETE_SUCCESS);
                getOpenings();
            }
        });

    }

    const togglePopup = () => {
        setDescriptionPopup(!descriptionPopup)
    }

    const handleAdd = () => {
        setOpenModal(true)
        //props.history.push('/add-opening')
    }

    const getOpenings = () => {
        const res = localStorage.get(Constants.TOKEN)
        let headers = {
            token: res
        }

        const data = http.getWithHeader('job/latest?count=5&page=1', { headers })
        data.then(res => {
            console.log(res);
            setOpening(res.data.data);
        })

    }



    const handleDetailsView = (e, rowData) => {
        setRowData(rowData);
        togglePopup();

    }

    const handleDetails = (e, data) => {
        setDescData(data);
        togglePopup();
    }


    const toggleReferrals = (e, data) => {
        setReferralData(data);
        setShowReferralPopup(!showReferralPopup);
    }


    const handleCloseModal = () => {
        setOpenModal(false);
    };



    return (
        <div>
            <Header />
            {/* <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" style={{ flexGrow: 1 }}>
                        Nagarro
                    </Typography>
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <Link to="/my-referrals" style={{ color: "rgba(0, 0, 0, 0.87)" }}><MenuItem onClick={handleClose}>My Referrals</MenuItem></Link>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar> */}
            <div className="container-fluid" >
                <div style={{ textAlign: "right", margin: "30px 0 15px 0" }}>
                    <Button
                        onClick={() => handleAdd(true)}
                        color="secondary"
                        variant="contained"
                    >Add Job</Button>
                </div>
                <MaterialTable
                    columns={[
                        { title: "Title", field: "title" },
                        { title: "Job Type", field: "jobType" },
                        { title: "Positions", field: "noOfPositions", type: "numeric" },
                        {
                            title: "Posted On",
                            field: "createdAt",

                        },
                        {
                            title: "Updated On",
                            field: "updatedAt",

                        }
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
                                handleDelete(event, rowData);
                            }
                        },
                        {
                            icon: "edit",
                            tooltip: "View Details",
                            onClick: (event, rowData) => {
                                // Do save operation
                                handleDetailsView(event, rowData);
                            }
                        }
                    ]}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            </div>
            {openModal ? <AddOpening handleCloseModal={handleCloseModal} openModal={openModal} rowData={rowData}></AddOpening> : null}
            {descriptionPopup ? <DescriptionPopup togglePopup={togglePopup} rowData={rowData}></DescriptionPopup> : null}


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