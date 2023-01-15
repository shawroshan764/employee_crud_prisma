const express = require("express")
const morgan = require("morgan")
const createError = require("http-errors")

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))


app.get("/", async(req,res,next) => {
    res.send({message: "Its working...."})
})

app.use("/api", require("./route/api_routes"))

app.use((req,res,next) => {
    next(createError.NotFound())
})

app.use((req,res,next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message:err.message
    })
})


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listening to PORT ${port}`);
})