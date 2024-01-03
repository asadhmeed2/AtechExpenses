const moment = require('moment');

const {NotADateError,ExpenseUndefinedError,NotAExpenseGroupError} = require('../customErrors/CustomErrors')

const {EXPENSE_GROUP} = require('../config/config')

const mapEpense=(expense)=>{
    let date = ''
    if(!expense.date){
        date = new Date(); 
    }else{
        date = expense.date;
    }
    return{
        ...expense,
        date : moment(date).format('LLLL')
    }
}

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
    isAvailableGroup,
    mapEpense
}