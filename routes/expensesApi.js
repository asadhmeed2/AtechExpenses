const express = require('express')
const router = express.Router()

const Expense = require('../model/Expense')

const {isDate,isNotUndefined,isAvailableGroup,mapEpense} = require('../utilties/expenseUtilty')

router.get('/', function (req, res) {
    Expense.find({}).sort({date:-1}).then( function (expenses) {
        res.send(expenses)
    })
})

router.post('/', function (req, res) {
    const expense = req.body
    
    try{
        isNotUndefined(expense)
        
        isAvailableGroup(expense.group)

        const mappedExpenses = mapEpense(expense)

        Expense.create(mappedExpenses).then( function (data){
            res.status(201).json(data)
        })
    }catch(error){
        console.error(error);
        res.status(400).send({message:error.message});
    }
})

router.put('/update', function (req, res) {

    const {group1, group2} =req.body
    
        Expense.findOneAndUpdate({group:group1},{group:group2},{new:true}).then( function (data){
            console.log(data);
            res.status(201).json(`expense ${data.item} group changed from ${group1} to ${group2}`)
        }).catch(error=>{
            console.error(error);
        })
    
})

router.delete ('/:id', function (req, res) {
    const personId = req.params.id;
    
    Expense.findByIdAndDelete(personId).then( function (data){
            console.log(data);
            res.status(201).json(data)
        }).catch(error=>{
            console.error(error);
            res.status(404).send({message: error.message});
        })
    
})



module.exports = router