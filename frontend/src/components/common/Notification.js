import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';


class Notification extends Component {
    state = {
        success: toast.success,
        error: toast.error,
        warn: toast.warn,
        info: toast.info,
    }

    notify = (msg_type, msg) => {
        this.state[msg_type](msg, {
            position: toast.POSITION.BOTTOM_CENTER
        })
    }

    render() {
        const { message_type, message } = this.props.message_object
        if (message) {
            return (
                <div>
                    {this.notify(message_type, message)}
                    <ToastContainer autoClose={2000} />
                </div>
            )
        }
        return null

    }
}

const mapStateToProps = state => ({
    message_object: state.authReducer.message_object
})

export default connect(mapStateToProps, null)(Notification)
