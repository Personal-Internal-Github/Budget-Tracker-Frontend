import React from "react";
import axios from "axios";

const IncomeAPI = {
  getIncome() {
    return axios.get('http://127.0.0.1:3000/income/getIncome', {
      headers: { "Access-Control-Allow-Origin": "*" }
    }).then(res => { return res }).catch(err => err)
  }
}

export default IncomeAPI;