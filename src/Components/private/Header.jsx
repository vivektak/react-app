import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import localStorage from '../../services/storageService';
import '../../styles/login.css';
import * as Constants from '../../Constants/Constants';
import { userContext } from '../../services/Context';


const Header = () => {

    const handleLogout = () => {
        localStorage.removeItem('token');
    }


    const { data, setData } = useContext(userContext);

    console.log(data);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="imgcontainer">
                <img src="/nagarro.png" alt="Avatar" className="avatar header-avatar" />
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to='/openings'>Home </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="skills">{data && data.role === 'admin' ? 'Skills' : null}</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="locations">{data && data.role === 'admin' ? 'Locations' : null}</Link>
                    </li>
                </ul>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <span className="nav-link">{data ? data.firstName + ' ' + data.lastName : null}</span>
                    </li>
                    <li className="nav-item">
                        <Link to="/my-referrals" className="nav-link">My Referrals</Link>
                        {/* <span className="nav-link">My Referrals</span> */}
                    </li>
                    <li className="nav-item">
                        <Link to="/login" onClick={() => handleLogout()} className="nav-link">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav >
    );
}

export default Header;