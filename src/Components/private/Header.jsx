import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import localStorage from '../../services/storageService';
import '../../styles/login.css';
import '../../styles/App.css';
import { userContext } from '../../services/Context';

import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider

} from "@material-ui/core";
import { Menu as MenuIcon, Work as WorkIcon, FormatListBulleted as FormatListBulletedIcon, AccountCircle, ExitToApp, Home as HomeIcon, LocationOn as LocationOnIcon, MenuBook as MenuBookIcon, PeopleOutline as PeopleOutlineIcon, } from "@material-ui/icons";
import http from '../../services/httpService';
import { useEffect } from 'react';



const Header = (props) => {
    const { data, setData } = useContext(userContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [roleData, setRoleData] = useState('');
    const [drawerData, setDrawerData] = useState([]);


    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            console.log(res.data.data);
            setRoleData(res.data.data);
            if (res.data.data.role === 'admin') {
                setDrawerData([{ name: 'Home', url: '/Openings' }, { name: 'My Referrals', url: '/my-referrals' }, { name: 'My Tickets', url: '/my-tickets' }])
            } else if (res.data.data.role === 'superadmin') {
                setDrawerData([{ name: 'Home', url: '/Openings' }, { name: 'Skills', url: '/skills' }, { name: 'Locations', url: '/locations' }, { name: 'My Referrals', url: '/my-referrals' }, { name: 'My Tickets', url: '/my-tickets' }])
            } else {
                setDrawerData([{ name: 'Home', url: '/Dashboard' }, { name: 'Job Openings', url: '/Openings', icon: WorkIcon }, { name: 'My Referrals', url: '/my-referrals' }])
            }
        })
    }

    useEffect(() => {
        getUserInfo();
    }, [])

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
                    <Link to={text.url} key={text.name}>
                        <ListItem button >
                            <ListItemIcon>
                                {
                                    text.name === 'Home' ? <HomeIcon /> : text.name === 'Skills' ? <MenuBookIcon /> : text.name === 'Locations' ? <LocationOnIcon /> : text.name === 'My Referrals' ? <PeopleOutlineIcon /> : text.name === 'Job Openings' ? <WorkIcon /> : <FormatListBulletedIcon />
                                }
                            </ListItemIcon>
                            <ListItemText primary={text.name} />
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                <Link to="/login" onClick={handleLogout}>
                    <ListItem button >
                        <ListItemIcon><ExitToApp /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </Link>
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
                    <Link to='/openings'>NAGARRO OPENINGS</Link>
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
                    <Link to="/login" className="sdfsd" style={{ color: "white" }}>
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
                </div>
            </Toolbar>
            <Drawer open={openDrawer} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </AppBar>
    );
}

export default Header;