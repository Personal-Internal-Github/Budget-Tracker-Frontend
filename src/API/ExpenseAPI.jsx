import axios from 'axios';
import config from '../config/config.js';

const url = config;

const ExpenseAPI = {
  async getExpense(){
    const response = await axios.get(url + '/expense/getExpense');

    const incomes = response.data

    // console.log(incomes)

    return incomes;
  },
  
  async getExpenseByMonth(){
    const response = await axios.get(url + '/expense/getExpenseByMonth');

    const totalExpenseByCurrentMonth = await response?.data?.map(data => data.expense_amount)?.reduce((prevValue, curValue) => prevValue + curValue, 0)
    // console.log(totalExpenseByCurrentMonth);
    return totalExpenseByCurrentMonth;
  },

  async addExpense(expenseAmount, expenseDescription){
    const response = await axios.post(url + '/expense/addExpense', {
      expenseAmount: expenseAmount,
      expenseDescription: expenseDescription
    });

    const addExpenseResponse = response.data;
    // console.log(addExpenseResponse);
    return addExpenseResponse;
  },

  async removeExpense(expenseId){
    const response = await axios.post(url + '/expense/removeExpense', {
      expenseId: expenseId
    });

    const removeExpenseResponse = response.data

    console.log(removeExpenseResponse);
    return removeExpenseResponse;
  }
}

export default ExpenseAPI;