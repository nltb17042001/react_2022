//router
import express from 'express'
import productCrl from '../controllers/productCtl'
import {checkProductData} from '../middleware/validate'
const router = express.Router()

router.get('/products', productCrl.getProducts)
router.get('/products/:id', productCrl.getProduct)
router.post('/products',checkProductData, productCrl.addProduct )
router.put('/products/:id', checkProductData, productCrl.updateProduct)
router.delete('/products/:id', productCrl.deleteProduct)

export default router;