import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import morgan from "morgan"
import routes from "./routes/index"

dotenv.config()

const app = express()


//middleware

app.use(cors())
app.use(morgan('dev'))

    // just receive data json when data return request API
app.use(express.json())
    // receive data like form html
app.use(express.urlencoded())


//database
console.log(process.env.MONGODB_URL)
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    autoIndex: false
}, (err) =>{
    if(err) throw err;
    console.log('MongoDB connection')
})

//router
app.use('/api', routes)

//server listening

const port = process.env.PORT || 5000;

app.listen( port, ()=>{
    console.log(`Express is listening on port ${port}`)
})


