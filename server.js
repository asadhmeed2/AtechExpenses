const express = require('express');

const expensesApi = require('./routes/expensesApi')

const {InitDataBase} = require('./initDatabase')

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Mongoose setup
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/peopleDB", {})
.catch((err)=> console.log(err))

InitDataBase();

app.use('/expense', expensesApi)

const port = 4300
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})