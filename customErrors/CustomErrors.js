class NotADateError extends Error{
    message = 'date is not a Date object';
}

class ExpenseUndefinedError extends Error{
    message = 'Expense is undefined';
}

class NotAExpenseGroupError extends Error{
    message = 'Expense Group is not valid';
}

module.exports ={
    NotADateError,
    ExpenseUndefinedError,
    NotAExpenseGroupError
}