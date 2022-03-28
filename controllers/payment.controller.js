const Order = require('../models/order');
const Payment = require('../models/payment');
const request = require('request-promise');
const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal =  ZarinpalCheckout.create('f1234567-f23f-32ef-awe3-005043a231be', true);


exports.postPayment = async (req, res, next) => {
    const orderId = req.body.orderId;
    console.log(req.user)
    const orders = await req.user.getOrders({where: {id: orderId}});
    const order = orders[0];
    const products = await order.getProducts();
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.OrderItem.quantity * product.price;
    })

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
            await payment.save()
            return res.json(response)
        } else if (response.status === -3) {
            console.log("DDD")
        }
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}

exports.paymentReturnPage = async (req, res, next) => {
    try {
        if (req.query.Status && req.query.Status !== 'OK') {
            console.log("LLLLGHHH")
            throw new Error("payment not successfully");
        }
        let payment = await Payment.findOne({where: {pay_code: req.query.Authority}});

        zarinpal.PaymentVerification({
            Amount: payment.price+"000", // In Tomans
            Authority: req.query.Authority,
        }).then(async (response) => {
            if (response.status !== 100) {
                throw new Error("payment not successfully");
            } else {
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
