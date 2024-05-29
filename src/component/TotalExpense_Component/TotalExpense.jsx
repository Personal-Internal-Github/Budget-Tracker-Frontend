import React, { useState, useEffect } from "react";
import { AddIcon } from '@chakra-ui/icons'
import './TotalExpense.css'

import ExpenseAPI from "../../API/ExpenseAPI";
import AddExpenseButton from "../AddExpense_Component/AddExpenseButton";

export default function TotalExpense() {
  const [totalExpense, setTotalExpense] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getTotalExpense = () => {
      ExpenseAPI.getExpense().then(res => {
        const expenseData = res.data.message;
        console.log(expenseData)
        const totalExpenseCalculation = expenseData.map((data, index) => data.expense_amount).reduce((prevValue, currentValue) => {
          let total = null
          // console.log(prevValue);
          // console.log(currentValue);
          if (currentValue === null || currentValue === '' || currentValue === 0) {
            total = prevValue;
            return total;
          };
          total = prevValue + currentValue
          return total;
        })
        console.log(totalExpenseCalculation)
        console.log(totalExpense)
        return setTotalExpense(totalExpenseCalculation);
      })
    }

    getTotalExpense();
  }, [])
  return (
    <>
      <div id='TotalExpense'>
        <button onClick={() => setIsOpen(true)}>
          <p>Total Expense Balance:</p>
          <p className="TotalExpenseText">{totalExpense}</p>
          <div className="AddExpenseIcon">
            <AddIcon />
          </div>
        </button>
        {/* <p id='TotalExpenseValue'>
        {totalExpense}
      </p> */}
      </div>

      {/* <div> */}
        {/* <AddExpenseButton isOpenProp={isOpen} onCloseProp={() => setIsOpen(false)}/> */}
      {/* </div> */}

    </>
  )
}