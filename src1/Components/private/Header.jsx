import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import localStorage from '../../services/storageService';
import '../../styles/login.css';
import '../../styles/App.css';
//import * as Constants from '../../Constants/Constants';
import { userContext } from '../../services/Context';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    // Button,
    // Container,
    // Dialog,
    // Slide,
    // DialogTitle,
    // DialogContent,
    // DialogContentText,
    // DialogActions,
    // Menu,
    // MenuItem,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider

} from "@material-ui/core";
//import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu as MenuIcon, AccountCircle, ExitToApp, Home as HomeIcon, LocationOn as LocationOnIcon, MenuBook as MenuBookIcon, PeopleOutline as PeopleOutlineIcon, } from "@material-ui/icons";
//import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const Header = (props) => {
    const { data, setData } = useContext(userContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);

    const drawerData = [{ name: 'Home', url: '/Openings', icon: HomeIcon }, { name: 'Skills', url: '/skills', icon: 'HomeIcon' }, { name: 'Locations', url: '/locations', icon: 'HomeIcon' }, { name: 'My Referral', url: '/my-referrals', icon: 'HomeIcon' }];

    //const open = Boolean(anchorEl);

    const handleLogout = () => {
        localStorage.removeItem('token');
        console.log(props);
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };


    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open);
    };


    const sideList = side => (
        <div
            style={{ width: "250px" }}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                <ListItem>
                    <img src="/nagarro.png" alt="header" className='headerImg' />
                </ListItem>
                {drawerData.map((text, index) => (
                    <Link to={text.url}>
                        <ListItem button key={text.name}>
                            <ListItemIcon>
                                {
                                    index === 0 ? <HomeIcon /> : index === 1 ? <MenuBookIcon /> : index === 2 ? <LocationOnIcon /> : <PeopleOutlineIcon />

                                }
                            </ListItemIcon>


                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>

                <ListItem button >
                    <ListItemIcon><ExitToApp /></ListItemIcon>
                    <Link to="/login" onClick={handleLogout}><ListItemText primary="Logout" /></Link>
                </ListItem>

            </List>
        </div >
    )

    return (

        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" style={{ flexGrow: 1 }}>
                    <Link to='/openings'>Home</Link>
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
                        <span className="nav-link">{data ? data.firstName + ' ' + data.lastName : null}</span>
                    </IconButton>
                    <Link to="/login" style={{ color: "white" }}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleLogout}
                            color="inherit"
                        >
                            <ExitToApp />
                        </IconButton>
                    </Link>
                    {/* <Menu
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
                    </Menu> */}
                </div>
            </Toolbar>
            <Drawer open={openDrawer} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </AppBar>
        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="imgcontainer">
        //         <img src="/nagarro.png" alt="Avatar" className="avatar header-avatar" />
        //     </div>
        //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //         <ul className="navbar-nav mr-auto">

        //             <li className="nav-item active">
        //                 <Link className="nav-link" to='/openings'>Home </Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className="nav-link" to="skills">{data && data.role === 'admin' ? 'Skills' : null}</Link>
        //             </li>
        //             <li className="nav-item">
        //                 <Link className="nav-link" to="locations">{data && data.role === 'admin' ? 'Locations' : null}</Link>
        //             </li>
        //         </ul>
        //         <ul className="navbar-nav">
        //             <li className="nav-item">
        //                 <span className="nav-link">{data ? data.firstName + ' ' + data.lastName : null}</span>
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/my-referrals" className="nav-link">My Referrals</Link>
        //                 {/* <span className="nav-link">My Referrals</span> */}
        //             </li>
        //             <li className="nav-item">
        //                 <Link to="/login" onClick={() => handleLogout()} className="nav-link">Logout</Link>
        //             </li>
        //         </ul>
        //     </div>
        // </nav >
    );
}

export default Header;