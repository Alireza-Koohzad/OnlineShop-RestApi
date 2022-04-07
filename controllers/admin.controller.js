const adminService = require('../services/admin.service');
const {checkValidationError} = require('../utils/validationError');


exports.addProduct = async (req, res, next) => {
    try {
        checkValidationError(req);
        const {name, price, description} = req.body;
        if(!req.file){
            let err = new Error("no image provided!")
            err.statusCode = 422;
            throw err;
        }
        let imageUrl = req.file.path;
        const product = await adminService.addProduct(name , price , description , imageUrl);
        if(product){
            res.status(201).json({
                message : "add product successfully",
                product : product
            })
        }
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

exports.editProduct =async (req,res,next)=>{
    try {
        checkValidationError(req);
        const prodId = req.params.prodId;
        console.log(prodId);
        const {name, price, description} = req.body;
        if(!req.file){
            let err = new Error("no image provided!")
            err.statusCode = 422;
            throw err;
        }
        let imageUrl = req.file.path;
        const product = await adminService.editProduct( prodId,name , price , description , imageUrl);
        if(product){
            res.status(201).json({
                message : "edit product successfully",
                product : product
            })
        }

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}
