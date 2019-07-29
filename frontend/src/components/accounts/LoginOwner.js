//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';

//material ui
import Button from '@material-ui/core/Button';
import { TextField } from 'material-ui'
import Typography from '@material-ui/core/Typography'


//action cretaors
import { loginOwner } from '../../store/actions/authActions';




class LoginOwner extends Component {
    state = {
        email: '',
        password: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault()
        this.props.loginOwner(this.state)

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        const { email, password } = this.state
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <Typography variant='h5' align='center'>
                        Owner Login
                    </Typography>

                    <br />
                    <form>
                        <p className='lead mb-0'>Email</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            autoComplete='email'
                            label='Email address'
                            defaultValue={email}
                            type='email'
                            autoFocus={true}
                            onChange={this.onChange}
                            name='email'
                            hintText='Email adress'
                        />
                        <br />


                        <p className='lead mb-0'>Password</p>
                        <TextField
                            required
                            fullWidth
                            label='Password'
                            defaultValue={password}
                            type='password'
                            onChange={this.onChange}
                            name='password'
                            hintText='Enter your Password'
                        />
                        <br />
                        <Button mt={8} fullWidth color='primary' component='span' size='large' variant='contained' onClick={this.onSubmit}>
                            <Typography variant='h6' align='center'>Login</Typography>
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

export default connect(mapStateToProps, { loginOwner })(LoginOwner)