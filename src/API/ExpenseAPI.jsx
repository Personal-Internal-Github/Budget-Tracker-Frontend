import axios from 'axios';

const ExpenseAPI = {
  getExpense(){
    return axios.get('http://127.0.0.1:3000/expense/getExpense').then(res => res).catch(err => err);
  }
}

export default ExpenseAPI;