import React, { Component } from 'react'
import { connect } from 'react-redux';
import Item from './Item';
import { getItems } from '../../store/actions/itemsActions'

class Items extends Component {
    componentDidMount() {
        if (this.props.items.length > 0) {
            return
        }
        else {
            this.props.getItems()
        }
    }

    render() {
        if (this.props.items.length < 1) {
            return (
                <React.Fragment>
                    <br />
                    <br />
                    <br />
                    <h1 className='lead my-4'>Add items to the list by pressing the add text on the top</h1>
                </React.Fragment>
            )

        }
        else {
            return (
                <div className='row no-gutters my-4'>
                    {this.props.items.map(item => (<Item key={item.id} item={item} />))}
                </div>
            )
        }

    }
}

const mapStateToProps = state => ({
    items: state.itemsReducer.filtered_items
})

export default connect(mapStateToProps, { getItems })(Items)
