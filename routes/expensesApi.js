const express = require('express')
const router = express.Router()

const Expense = require('../model/Expense')

const {checkDates,isNotUndefined,isAvailableGroup,mapEpense,dateQuery} = require('../utilties/expenseUtilty')

router.get('/', function (req, res) {
    const {d1,d2} = req.query

    const [isD1,isD2] = checkDates(d1,d2)
    
    const findQuery = dateQuery([isD1,isD2],[d1,d2])

    Expense.find(findQuery).sort({date:-1}).then( function (expenses) {
        const mappedExpenses = expenses.map(expense =>expense.toObject())
        res.send(mappedExpenses)
    })
})

router.get('/expenses/:group', function (req, res) {
    const total = req.query.total
    const group = req.params.group

    let aggregatePipeline = [
        {$match: {group}},
    ]

    if(total === 'true'){
        aggregatePipeline.push({
            $group:{
                _id: '$group',
                expenses:{$sum: {$toDouble:'$amount'}}
            }
        })
    }

    Expense.aggregate(
        aggregatePipeline
        ).then( function (expensesArray) {
            if(total === 'true'){
                res.send({expenses: expensesArray[0].expenses})
            }else{
                const mappedExpenses = expensesArray.map(expense =>expense.toObject())
                res.send(mappedExpenses)

            }
    }).catch(error=>{
        console.log(error);
    })
})

router.post('/', function (req, res) {
    const expense = req.body
    
    try{
        isNotUndefined(expense)
        
        isAvailableGroup(expense.group)

        const mappedExpenses = mapEpense(expense)

        Expense.create(new Expense(mappedExpenses)).then( function (data){
            const mappedExpense  = mapEpense(data)
            res.status(201).json(mappedExpense)
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



module.exports = router