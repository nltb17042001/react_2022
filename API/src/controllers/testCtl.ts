import Products from "../models/productModel";
import { APIfeatures } from "../lib/testfeatures";
const testCtl = {
    getProducts: async (req,res, next) => {
        console.log(req.query) 
        try {
            
            const features = new APIfeatures(Products.find(), req.query).paginating()
            console.log(features.query)
            const result = await features.query
            const count =  await Products.countDocuments()
            // const totalPage = 
            res.status(200).json({result: result , count: count})
        } catch (error) {
            console.log(error.message)
        }
    }
    
}
export default testCtl