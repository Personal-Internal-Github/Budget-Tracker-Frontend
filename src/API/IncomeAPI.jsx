import React from "react";
import axios from "axios";

const IncomeAPI = {
  getIncome() {
    return axios.get('http://127.0.0.1:3000/income/getIncome', {
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => { return res }).catch(err => err)
  },

  getIncomeByMonth(){
    return axios.get('http://127.0.0.1:3000/income/getIncomeByMonth').then(res => { return res }).catch(err => err)
  },

  addIncome(incomeValue){
    return axios.post('http://127.0.0.1:3000/income/addIncome',{
      incomeValue: incomeValue
    }).then(res => res).catch(err => err)
  },

  deleteIncome(incomeId){
    return axios.post('http://127.0.0.1:3000/income/removeIncome', {
      incomeId: incomeId
    }).then(res => res).catch(err => err)
  }
}

export default IncomeAPI;