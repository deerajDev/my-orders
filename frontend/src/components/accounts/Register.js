//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'

//material ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import { TextField } from 'material-ui'
import Typography from '@material-ui/core/Typography'

//action creators
import { register } from '../../store/actions/authActions';


class Register extends Component {
    state = {
        email: '',
        password: '',
        shop_name: ''
    }

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onSubmit = e => {
        e.preventDefault()
        this.props.register(this.state)

    }

    render() {
        const { email, password, shop_name } = this.state
        if (this.props.isAuthenticated) {
            return <Redirect to='/' />
        }
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <Typography variant='h5' align='center'>
                        Register Your Shop
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
                        <p className='lead mb-0'>Shop Name</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            autoComplete=''
                            label='Shop Name'
                            defaultValue={shop_name}
                            type='text'
                            onChange={this.onChange}
                            name='shop_name'
                            hintText='Shop Name'
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
                        <Grid container mb={8} justify='space-around' alignContent='space-around' spacing={1} direction='row'>
                            <Grid item xs={6}>
                                <small className='lead'>Already have an account?</small>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h6'><NavLink to='/login/staff'>Staff</NavLink></Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant='h6'><NavLink to='/login/owner'>Owner</NavLink></Typography>
                            </Grid>

                        </Grid>
                        <Button mt={8} fullWidth color='primary' component='span' size='large' variant='contained' onClick={this.onSubmit}>
                            <Typography variant='h6' align='center'>Register</Typography>
                        </Button>

                    </form>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.user.isAuthenticated
}
)


export default connect(mapStateToProps, { register })(Register)
