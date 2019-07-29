//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux';

//material ui
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

//action creators
import { createItem, notifyUser } from '../../store/actions/itemsActions';

class CreateItem extends Component {
 
    state = {
        item_name: '',
        cost: 0
    }


    onSubmit = e => {   
        const {item_name , cost } =  this.state
        if (!item_name){
            return this.props.notifyUser({message_type:'error', message:'Item name is required'})
        }
        else if (cost<1){
            return this.props.notifyUser({message_type:'error', message:'Cost should be valid positive number'})
        }
        else{
            this.props.createItem(item_name, cost)
            this.setState({
                item_name: '',
                cost: 0
            })
        }
    }



    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        const { item_name, cost } = this.state
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <Typography variant='h5' align='center'>
                        Create your item..
                    </Typography>

                    <br />
                    <form>
                        <p className='lead mb-0'>Item Name</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            autoComplete=''
                            label='Item Name'
                            value={item_name}
                            type='text'
                            onChange={this.onChange}
                            name='item_name'
                            hinttext='Item Name'
                        />
                        <br />
                        <p className='lead mb-0'>Cost</p>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            autoComplete='1'
                            label='Cost'
                            value={cost}
                            type='number'
                            min={1}
                            onChange={this.onChange}
                            name='cost'
                            hinttext='Cost'
                        />
                        <br />

                        <Button fullWidth color='primary' component='span' size='large' variant='contained' onClick={this.onSubmit}>
                            <Typography variant='h6' align='center'>Create</Typography>
                        </Button>

                    </form>
                </div>
            </div>

        )
    }
}

export default connect(null, { createItem , notifyUser})(CreateItem)
