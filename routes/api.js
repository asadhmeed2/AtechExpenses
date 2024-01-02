const express = require('express')
const router = express.Router()

const Expense = require('../model/Expense')

router.get('/', function (req, res) {
    Expense.find({}).then( function (people) {
        res.send(people)
    })
})

router.post('/', function (req, res) {
    const person = req.body
    try{

        Expense.create(person).then( function (data){
            console.log(data);
            res.status(201).json(data)
        })
    }catch(error){
        console.error(error);
    }
})

router.put('/:id', function (req, res) {
    const personId = req.params.id;
    const person = req.body
    
        Expense.findByIdAndUpdate(personId,person,{new:true}).then( function (data){
            console.log(data);
            res.status(201).json(data)
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