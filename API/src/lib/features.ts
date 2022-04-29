//constructors and obj instances

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
    }

    // Product.find().soft()
    this.sorting = ()=>{
        const sort = this.queryString.sort  || '-price'  //value in sort to string 
        this.query = this.query.sort(sort)
        return this;
    }


    //Product.find().find()
    this.searching = ()=>{
        const search = this.queryString.search // value search is string
        if(search){
            this.query = this.query.find({
                $text:{$search: search} 
            })
        }else{
            this.query = this.query.find()
        }

        return this;
    }
    //Product.find().find().limit().skip()
    this.filtering = ()=>{
        const queryObj = {...this.queryString}
        const excludedFields = ['page', 'sort', 'search','limit']
        excludedFields.forEach(el => delete(queryObj[el]))
        console.log(queryObj)
        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match) // modify url to right query of mongoDB
        console.log(queryString)
        const newQuery = JSON.parse(queryString)
        this.query = this.query.find(newQuery)
        return this;
    }
    console.log(this)
}