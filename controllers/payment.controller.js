const Order = require('../models/order');
const Payment = require('../models/payment');
const request = require('request-promise');
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('f1234567-f23f-32ef-awe3-005043a231be', true);


exports.postPayment = async (req, res, next) => {
    const orderId = req.body.orderId;
    const orders = await req.user.getOrders({where: {id: orderId}});
    const order = orders[0];
    if (order.payment_status) {
        return res.json({
            message: "This order has already been paid"
        })
    }

    const products = await order.getProducts();
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.OrderItem.quantity * product.price;
    })
    console.log(products)

    zarinpal.PaymentRequest({
        Amount: totalPrice.toString() + "000",
        CallbackURL: 'http://localhost:3000/payment/returnPage',
        Description: `بابت خرید سفارش با شماره${orderId}`,
        Email: req.user.email,
        Mobile: '09120000000'
    }).then(async (response) => {
        if (response.status === 100) {
            let payment = new Payment({
                pay_code: response.authority,
                price: totalPrice
            })
            order.payment_status = true;
            order.shipping_status = true;
            await order.save();
            await payment.save()
            return res.json(response)
        }
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.paymentReturnPage = async (req, res, next) => {
    console.log("ADGAHSTHTSH")
    try {
        if (req.query.Status && req.query.Status !== 'OK') {
            throw new Error("payment not successfully");
        }
        let payment = await Payment.findOne({where: {pay_code: req.query.Authority}});

        zarinpal.PaymentVerification({
            Amount: payment.price + "000", // In Tomans
            Authority: req.query.Authority,
        }).then(async (response) => {
            if (response.status !== 100) {
                throw new Error("payment not successfully");
            } else {
                console.log("CCCARGAEG")
                payment.set({status: true})
                await payment.save();
                return res.json({
                    message: "payment successfully ",
                })
            }
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
