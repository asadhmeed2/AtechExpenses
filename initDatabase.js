const mongoose = require('mongoose');
const data = require(`./expenses`)

const Expense = require('./model/Expense')


const onInsert = function (err, docs) {
    if (err) { console.log(err) }
    else { console.info('Done'); mongoose.disconnect() }
}

const InitDataBase=()=>{
    Expense.find({}).then(expenses=>{
        if(!expenses.length){
            const expeses = data.map(item => new Expense(item));
            
            Expense.collection.insertMany(expeses, onInsert)
        }
    })
}


module.exports ={InitDataBase}