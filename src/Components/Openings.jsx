import React, { useEffect, useState } from 'react';
import Header from './Header';

import localStorage from '../services/storageService'
import http from "../services/httpService";


const Openings = (props) => {

    const [Opening, setOpening] = useState([]);

    const handleEdit = (e, id) => {
        const data = Opening.filter(opening => opening._id === id);
        props.history.push(`/openings/${id}`, { data })
    }

    const handleDelete = (e, id) => {
        const res = localStorage.get('token')
        let headers = {
            token: res
        }
        http.deleteWithHeader(`job/delete/${id}`, { headers }).then(res => {
            if (res.status === 200) {
                getOpenings();
            }
        });

    }

    const handleAdd = () => {
        props.history.push('/add-opening')
    }

    const getOpenings = () => {
        const res = localStorage.get('token')
        let headers = {
            token: res
        }

        const data = http.getWithHeader('job/latest?count=5&page=1', { headers })
        data.then(res => {
            setOpening(res.data.data);
        })

    }


    useEffect(() => {
        getOpenings();
    }, []);


    return (
        <div className="container-fluid">
            <Header />
            <button className="btn btn-primary cancelbtn m-2" onClick={() => handleAdd()}>Add</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Job Type</th>
                        <th scope="col">Location</th>
                        <th scope="col">Skills</th>
                        <th scope="col">No of Positions</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        Opening.map(opening =>
                            <tr key={opening._id}>
                                <td>{opening._id}</td>
                                <td>{opening.title}</td>
                                <td>{opening.jobType}</td>
                                <td>{opening.location}</td>
                                <td>{opening.skills}</td>
                                <td>{opening.noOfPositions}</td>
                                <td><button className="btn btn-secondary cancelbtn" onClick={(e) => handleEdit(e, opening._id)}>Edit</button></td>
                                <td><button className="btn btn-danger cancelbtn" onClick={(e) => handleDelete(e, opening._id)}>Delete</button></td>
                            </tr>)
                    }

                </tbody>
            </table>
        </div>
    );
}

export default Openings;