//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

//material ui
import Button from '@material-ui/core/Button';
import { TextField } from 'material-ui'
import Typography from '@material-ui/core/Typography'

//action creators
import { loginStaff } from '../../store/actions/authActions';





class LoginStaff extends Component {
    state = {
        shop_name: '',
        shop_id: ''
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = e => {
        e.preventDefault()
        this.props.loginStaff(this.state)
    }
    render() {
        const { shop_name, shop_id } = this.state
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }

        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <Typography variant='h5' align='center'>
                        Staff Login
                    </Typography>

                    <br />
                    <form>
                        <p className='lead mb-0'>Shop Name</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required={true}
                            fullWidth
                            autoComplete='Shop Name'
                            label='Shop Name'
                            defaultValue={shop_name}
                            type='text'
                            autoFocus={true}
                            onChange={this.onChange}
                            name='shop_name'
                            hintText='Shop Name'
                        />
                        <br />
                        <p className='lead mb-0'>Shop ID</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required={true}
                            fullWidth
                            autoComplete=''
                            label='Shop ID'
                            defaultValue={shop_id}
                            type='text'
                            onChange={this.onChange}
                            name='shop_id'
                            hintText='Shop ID'
                        />
                        <br />

                        <Button fullWidth color='primary' size='large' variant='contained' component='span' onClick={this.onSubmit}>
                            Login
                        </Button>
                    </form>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => (
    { isAuthenticated: state.authReducer.user.isAuthenticated }
)
export default connect(mapStateToProps, { loginStaff })(LoginStaff)
