const mongoose = require('mongoose');
const fs = require("fs")
const data = JSON.parse(fs.readFileSync(`${__dirname}/expenses.json`))

const Expense = require('./model/Expense')


const onInsert = function (err, docs) {
    if (err) { console.log(err) }
    else { console.info('Done'); mongoose.disconnect() }
}

const InitDataBase=()=>{
    Expense.find({}).then(expenses=>{
        if(!expenses.length){
            Expense.collection.insertMany(data, onInsert)
        }
    })
}


module.exports ={InitDataBase}