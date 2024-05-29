import React, { useState, useEffect } from 'react';
import {useQuery} from '@tanstack/react-query'

import IncomeAPI from '../../API/IncomeAPI';
import ExpenseAPI from '../../API/ExpenseAPI';
import './TotalIncomeBudget.css'

export default function TotalBudgetBalance() {
  const totalIncomeData = useQuery({
      queryKey: ['totalIncomes'],
      queryFn: () => IncomeAPI.getIncomeByMonth()
    });

  const totalExpenseData = useQuery({
      queryKey: ['totalExpenses'],
      queryFn: () => ExpenseAPI.getExpenseByMonth()
    });

  return (
    <div className='TotalBudgetBalanceView'>
      <div className='TotalBudgetBalance' style={{backgroundColor: totalIncomeData?.data - totalExpenseData?.data < 0 ? "orange" : "#23a1ef"}}>
        <p>Net Balance:</p>
        {
          totalIncomeData?.data == NaN && totalExpenseData?.data == NaN ?
          <h3>0</h3>
          :
        <h3>{totalIncomeData?.data - totalExpenseData?.data}</h3>
        }
      </div>
    </div>
  )
}