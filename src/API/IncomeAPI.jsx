import React from "react";
import axios from "axios";

const IncomeAPI = {
  async getIncome() {
    const response = await axios.get('http://127.0.0.1:3000/income/getIncome', {
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    const incomes = response.data
    // console.log(incomes)
    return incomes;
  },

  async getIncomeByMonth(){
    const response = await axios.get('http://127.0.0.1:3000/income/getIncomeByMonth')
    // console.log(response);

    const totalIncomeData = response.data.map(data => data.income).reduce((prevValue, curValue) => prevValue + curValue);
    // console.log(totalIncomeData);
    return totalIncomeData;
  },

  async addIncome(incomeValue){
    const response = axios.post('http://127.0.0.1:3000/income/addIncome',{
      incomeValue: incomeValue
    })

    const addIncomeResponse = await response.data
    return addIncomeResponse;
  },

  async deleteIncome(incomeId){
    const response = axios.post('http://127.0.0.1:3000/income/removeIncome', {
      incomeId: incomeId
    });

    const deleteIncomeResponse = await response.data
    // console.log(deleteIncomeResponse)
    return deleteIncomeResponse;
  }
}

export default IncomeAPI;