import React from 'react'
import { connect } from 'react-redux'

const Profile = ({ shop }) => {
    return (
        <div className='my-4'>
            <br />
            <br />
            <h3 className='lead mt-4'>Shop Name:  {shop.shop_name}</h3>
            <br />
            <h3 className='lead'>Shop ID:  {shop.shop_id}</h3>
            <br />
            <h3 className='lead'>Analytics will be introduced soon......</h3>
        </div>
    )
}


const mapStateToProps = state => ({
    shop: state.authReducer.shop
})


export default connect(mapStateToProps, null)(Profile)