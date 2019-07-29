def parseOrders(orders):
    pending_orders = []
    for order in orders:
        order_dict = {}
        order_dict['id'] = order.id
        order_dict['item_name'] = order.item.name
        order_dict['description'] = order.description
        order_dict['order_type'] = order.order_type
        pending_orders.append(order_dict)
    return pending_orders



    