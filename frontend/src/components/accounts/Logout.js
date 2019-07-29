import React from 'react'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../store/actions/authActions';

const Logout = ({ logoutUser }) => {
    return (
        <div className='my-4'>
            <br />
            <br />
            <h2>Do you want to logout</h2>
            <div className='row mt-2'>
                <div className='col-6 my-2'>
                    <NavLink to='/'>Go back to home</NavLink>
                </div>
                <div className='col-6 my-2'>
                    <p className='lead' onClick={logoutUser}>Yes</p>
                </div>
            </div>
        </div>
    )
}


export default connect(null, { logoutUser })(Logout)