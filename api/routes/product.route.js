const express=require('express')
const router=express.Router()
const productController=require('../controllers/product.controller') 
const checkAuth=require("../midlewares/check-auth.midleware")

router.get('/',productController.get_all_products)
router.get('/:id',productController.get_one_product)
router.post('/',checkAuth,productController.create_product)
router.delete('/:id',checkAuth,productController.remove_product)
router.patch('/:id',checkAuth,productController.update_product)

module.exports=router
