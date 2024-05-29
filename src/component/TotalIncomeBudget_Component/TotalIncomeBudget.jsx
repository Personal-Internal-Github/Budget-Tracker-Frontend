import React, { useState, useEffect } from 'react';

import IncomeAPI from '../../API/IncomeAPI';
import ExpenseAPI from '../../API/ExpenseAPI';
import './TotalIncomeBudget.css'

export default function TotalBudgetBalance() {
  const [totalBudgetBalance, setTotalBudgetBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    function getTotalIncomeByMonth() {
      IncomeAPI.getIncomeByMonth().then(res => {
        setTotalIncome(res.data.totalIncomeAmount[0])
      }).catch(err => console.log(err))
    }

    function getTotalExpenseByMonth() {
      ExpenseAPI.getExpenseByMonth().then(res => setTotalExpense(res.data.totalExpenseAmount[0])).catch(err => console.log(err))
    }

    function totalBudgetBalance() {
      setTotalBudgetBalance(totalIncome - totalExpense);
    }

    getTotalIncomeByMonth();
    getTotalExpenseByMonth();
    totalBudgetBalance();
  }, [])

  return (
    <div className='TotalBudgetBalanceView'>
      <div className='TotalBudgetBalance'>
        <p>Total Balance:</p>
        <h3>{totalBudgetBalance}</h3>
      </div>
    </div>
  )
}