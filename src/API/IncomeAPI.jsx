import React from "react";
import axios from "axios";
import config from '../config/config.js';

const url = config;

const IncomeAPI = {
  async getIncome() {
    const response = await axios.get(url + '/income/getIncome', {
      headers: { "Access-Control-Allow-Origin": "*" }
    })

    const incomes = response.data
    console.log(incomes)
    return incomes;
  },

  async getIncomeByMonth(){
    const response = await axios.get(url + '/income/getIncomeByMonth')
    // console.log(response);

    const totalIncomeData = response?.data?.map(data => data.income)?.reduce((prevValue, curValue) => prevValue + curValue, 0);
    // console.log(totalIncomeData);
  return totalIncomeData;
  },

  async addIncome(incomeValue, incomeDescription){
    const response = axios.post(url + '/income/addIncome',{
      incomeValue: incomeValue,
      incomeDescription: incomeDescription
    })

    const addIncomeResponse = await response.data
    return addIncomeResponse;
  },

  async deleteIncome(incomeId){
    const response = axios.post(url + '/income/removeIncome', {
      incomeId: incomeId
    });

    const deleteIncomeResponse = await response.data
    // console.log(deleteIncomeResponse)
    return deleteIncomeResponse;
  }
}

export default IncomeAPI;