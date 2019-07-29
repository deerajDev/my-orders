//react redux
import React, { Component } from 'react'
import { connect } from 'react-redux'
//material ui
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//action creators
import { sendOrderCompleted } from '../../store/actions/itemsActions'


class PendingOrder extends Component {

    onClick = e => {
        // console.log(this.props.item.id)
        this.props.sendOrderCompleted(this.props.item.id)
    }

    render() {
        let button_type = 'secondary'
        if (this.props.item.order_type[0] === 'P') {
            button_type = 'primary'
        }
        return (
            <div className='col-sm-5 col-lg-4 mx-auto my-4'>
                <Card >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {this.props.item.item_name}
                        </Typography>
                    </CardContent>
                    <p className='lead ml-2'>{this.props.item.description}</p>
                    <CardActions>
                        <Button
                            fullWidth
                            size="medium"
                            color={button_type}
                            variant='contained'
                            value={'here'}
                            onClick={this.onClick}>
                            {this.props.item.order_type}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default connect(null, { sendOrderCompleted })(PendingOrder)
