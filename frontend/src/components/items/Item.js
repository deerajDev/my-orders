//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux'

//material ui
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

//action creators
import { makeOrder } from '../../store/actions/itemsActions'

class Item extends Component {
    state = {
        description: ''
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onClick = (e) => {
        this.props.makeOrder(this.props.item.name, this.props.item.id, e.target.innerHTML, this.state.description)
    }

    render() {
        const description = this.state.description
        return (
            <div className='col-sm-5 col-lg-4 mx-auto my-3'>
                <Card >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.item.name}
                        </Typography>
                    </CardContent>
                    <TextField
                        variant='outlined'
                        fullWidth
                        label='Extra description'
                        defaultValue={description}
                        onChange={this.onChange}
                        type='text'
                        name='description'
                        hinttext='Extra description'
                    />

                    <CardActions>
                        <Grid container direction='row' justify='space-around'>
                            <Button
                                size="medium"
                                color="secondary"
                                variant='contained'
                                value={'here'}
                                onClick={this.onClick}>
                                Here
                            </Button>
                            <Button
                                size="medium"
                                color="primary"
                                variant='contained'
                                value={'parcel'}
                                onClick={this.onClick}
                            >
                                Parcel
                            </Button>
                        </Grid>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(null, { makeOrder })(Item)
