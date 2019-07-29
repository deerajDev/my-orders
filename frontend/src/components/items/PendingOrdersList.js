import React, { Component } from 'react'
import { connect } from 'react-redux';
import PendingOrder from './PendingOrder';


class PendingOrdersList extends Component {
    render() {
        return (
            <div className='row no-gutters my-4'>
                {this.props.pending_orders.map(order => (<PendingOrder key={order.id} item={order}/>))}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pending_orders: state.itemsReducer.pending_orders
})

export default connect(mapStateToProps, {})(PendingOrdersList)
