import React, { useState, useEffect } from 'react';
import {useQuery} from '@tanstack/react-query'

import IncomeAPI from '../../API/IncomeAPI';
import ExpenseAPI from '../../API/ExpenseAPI';
import './TotalIncomeBudget.css'

export default function TotalBudgetBalance() {
  const totalIncomeData = useQuery({
      queryKey: ['totalIncome'],
      queryFn: () => IncomeAPI.getIncomeByMonth()
    });

  const totalExpenseData = useQuery({
      queryKey: ['totalExpense'],
      queryFn: () => ExpenseAPI.getExpenseByMonth()
    });

  return (
    <div className='TotalBudgetBalanceView'>
      <div className='TotalBudgetBalance'>
        <p>Total Balance:</p>
        <h3>{totalIncomeData.data - totalExpenseData.data}</h3>
      </div>
    </div>
  )
}