import Products from "../models/productModel";
import { APIfeatures } from "../lib/features";
const productCrl = {
    getProducts:async (req,res) => {
        // console.log(req.query)
        try {
            const features = new APIfeatures(Products.find(), req.query).paginating().sorting().searching().filtering()


            const result = await Promise.allSettled([
                features.query,
                Products.countDocuments()
            ])
            const products = result[0].status === 'fulfilled'? result[0].value: [];
            const count = result[1].status === 'fulfilled'? result[1].value: 0;
            // console.log(result)
            return res.status(200).json({products,count})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    },
    getProduct: async (req,res) => {
        try {
            const product = await Products.findById(req.params.id)
            if(!product)
            return res.status(404).json({msg:'this product does not exist'})

            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    },
    addProduct:async (req,res) => {
          try {
            console.log({body: req.body}) //read body of req form client
            const newProduct = new Products(req.body)
            await newProduct.save()
            return res.status(200).json(newProduct)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    },
    updateProduct: async (req,res) => {
        try {
            
            console.log({body: req.body}) //read body of req form client
            const product =  await Products.findByIdAndUpdate(req.params.id, req.body , {new: true}) 
            if(!product)
            return res.status(404).json({msg:'this product does not exist'})
            return res.status(200).json(product)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    },
    deleteProduct:async (req,res) => {
        try {
            
            console.log({body: req.body}) //read body of req form client
            const product =  await Products.findByIdAndDelete(req.params.id) 
            if(!product)
            return res.status(404).json({msg:'this product does not exist'})
            return res.status(200).json({msg: 'Delete success'})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        } 
    }
}
export default productCrl