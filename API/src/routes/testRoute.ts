import express from 'express'
import  testCtl  from '../controllers/testCtl'
import {checkProductData} from '../middleware/validate'
const test = express.Router()

test.get('/products', testCtl.getProducts )
// test.get('/products/:id', productCrl.getProduct)
// test.post('/products',checkProductData, productCrl.addProduct )
// test.put('/products/:id', checkProductData, productCrl.updateProduct)
// test.delete('/products/:id', productCrl.deleteProduct)

export default test;