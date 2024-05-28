import React, { useState, useEffect, useCallback } from 'react';

import IncomeAPI from '../API/IncomeAPI';

export default function IncomePage() {
  const [incomeAPI, setIncomeAPI] = useState([])

  useEffect(() => {
    const getIncome = () => {
      IncomeAPI.getIncome().then(res => {
        console.log(res);
        setIncomeAPI(res.data)
      })
    }

    getIncome();
  }, []);

  return (
    <>
      <h1>This is an income page</h1>

      <div>
        {
          incomeAPI.map((data, index) => {
            return (
              <ul>
                <li>{data.income}</li>
              </ul>
            )
          })
        }
      </div>
    </>
  )
}