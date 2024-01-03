const moment = require('moment');

const {IOSDate} = require('mongoose')

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
        date: moment(date).format('LLLL')
    }
}

const isDate =(date)=>{
    if(!moment(date).isValid()){
        throw new NotADateError();
    }
}

const checkDates=(d1,d2)=>{
    return [!!d1,!!d2]
}

const dateQuery = (isDates,dates)=>{
    const [isD1,isD2] =isDates
    const [d1,d2] = dates

    const query = {}
    if(isD1){
        query.$and=[{
            date:{$gte: new Date(d1)}
        }]
    }else{
        return query
    }

    if(isD2){
        query.$and.push({
            date:{$lte: new Date(d2)}
        })
    }else{
        query.$and.push({
            date:{$lte: new Date()}
        })
    }

    return query
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
    checkDates,
    dateQuery,
    isNotUndefined,
    isAvailableGroup,
    mapEpense,
}