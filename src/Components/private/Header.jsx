import React, { useContext, useState, useEffect } from 'react';
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
    Divider,
    Badge,
    Menu,
    MenuItem

} from "@material-ui/core";
import { Menu as MenuIcon, Work as WorkIcon, Notifications as NotificationsIcon, FormatListBulleted as FormatListBulletedIcon, AccountCircle, ExitToApp, Home as HomeIcon, LocationOn as LocationOnIcon, MenuBook as MenuBookIcon, PeopleOutline as PeopleOutlineIcon, } from "@material-ui/icons";
import http from '../../services/httpService';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    margin: {
        margin: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
        width: '100%',
    },
    row: {
        marginTop: theme.spacing(2),
    },
}));



const Header = (props) => {
    const classes = useStyles();
    const { data, setData } = useContext(userContext);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [roleData, setRoleData] = useState('');
    const [drawerData, setDrawerData] = useState([]);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const open = Boolean(anchorEl);

    const handleLogout = () => {
        localStorage.removeItem('token');
    }

    const handleNotifications = event => {
        if (notificationCount === 0) {
            setNotifications([]);
        } else {

            setAnchorEl(event.currentTarget);
        }
        http.deleteWithHeader('notification/deleteMyNotification').then(res => {
            setNotificationCount(0);
        }).catch(error => {

        })

    };

    const getNotification = () => {
        http.getWithHeader('notification/myNotifications').then(res => {
            setNotifications(res.data.data);
            setNotificationCount(res.data.data.length);
        }).catch(error => {

        })

    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getUserInfo = () => {
        http.getWithHeader('user/info').then(res => {
            setRoleData(res.data.data);
            if (res.data.data.role === 'admin') {
                setDrawerData([{ name: 'Home', url: '/Openings' }, { name: 'My Referrals', url: '/my-referrals' }, { name: 'My Tickets', url: '/my-tickets' }])
            } else if (res.data.data.role === 'superadmin') {
                setDrawerData([{ name: 'Home', url: '/Openings' }, { name: 'Skills', url: '/skills' }, { name: 'Locations', url: '/locations' }, { name: 'My Referrals', url: '/my-referrals' }, { name: 'My Tickets', url: '/my-tickets' }])
            } else {
                setDrawerData([{ name: 'Home', url: '/Dashboard' }, { name: 'Job Openings', url: '/Openings', icon: WorkIcon }, { name: 'My Referrals', url: '/my-referrals' }])
            }
        }).catch(error => {

        })
    }

    useEffect(() => {
        getUserInfo();
        getNotification();
        setInterval(getNotification, 10000);
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
                        color="inherit"
                    >
                        <AccountCircle />
                        <span className="nav-link">{data ? data.firstName + ' ' + data.lastName : null}</span>
                    </IconButton>
                    <IconButton onClick={handleNotifications}>
                        <Badge color="secondary" badgeContent={notificationCount} className={classes.margin} >
                            <NotificationsIcon />
                        </Badge>
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
                        <Link to='my-tickets'>
                            {notifications.map(notifications => (
                                <MenuItem onClick={handleClose}>{notifications.message}</MenuItem>
                            ))}
                        </Link>


                    </Menu>
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
        </AppBar >
    );
}

export default Header;