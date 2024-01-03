const moment = require('moment');

const {NotADateError,ExpenseUndefinedError,NotAExpenseGroupError} = require('../customErrors/CustomErrors')

const {EXPENSE_GROUP} = require('../config/config')

const isDate =(date)=>{
    if(!moment(date).isValid()){
        throw new NotADateError();
    }
}

const isNotUndefined =(expense)=>{
    if(!expense){
        throw new ExpenseUndefinedError();
    }
}

const isAvailableGroup =(group)=>{
    if(!EXPENSE_GROUP.includes(group)){
        throw new NotAExpenseGroupError();
    }
}


module.exports ={
    isDate,
    isNotUndefined,
    isAvailableGroup
}