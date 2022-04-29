export const checkProductData = async (req, res, next) =>{
    const err = [];

    for (const key in req.body) {
        if (!req.body[key]){
            err.push(`Add ${key} please !`)
        }
            
        
    }

    if (err.length){
         return res.status(401).json({msg: err})
    }
    next();
}