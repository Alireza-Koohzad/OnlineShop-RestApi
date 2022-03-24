const Order = require('../models/order');
const OrderItem = require('../models/order-item');

exports.getOrders = async (req)=>{
    return  await req.user.getOrders({include: ['Products']});
}

exports.findOrderItems = async (order)=>{
    const orderItems = await order.getProducts();
    if(orderItems.length>0)
        return orderItems;

}
