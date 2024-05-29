import axios from 'axios';

const ExpenseAPI = {
  getExpense(){
    return axios.get('http://127.0.0.1:3000/expense/getExpense').then(res => res).catch(err => err);
  },
  
  getExpenseByMonth(){
    return axios.get('http://127.0.0.1:3000/expense/getExpenseByMonth').then(res => res).catch(err => err);
  },

  addExpense(expenseAmount, expenseDescription){
    return axios.post('http://127.0.0.1:3000/expense/addExpense', {
      expenseAmount: expenseAmount,
      expenseDescription: expenseDescription
    }).then(res => res).catch(err => err);
  },

  removeExpense(expenseId){
    return axios.post('http://127.0.0.1:3000/expense/removeExpense', {
      expenseId: expenseId
    }).then(res => res).catch(err => err);
  }
}

export default ExpenseAPI;