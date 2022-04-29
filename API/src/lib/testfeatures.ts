export function APIfeatures(query, queryString){
    this.query = query; //Product.find
    this.queryString= queryString //req.query

    //Product.find().limit().skip()
    this.paginating = ()=>{
        const page = this.queryString.page * 1 || 1 // convert value in obj to number 
        const limit = this.queryString.limit *1 || 5
        const skip = limit * (page - 1)
        this.query = this.query.skip(skip).limit(limit)
        return this;

        // return {query: this.query, totalPage: totalPage };
    }
}