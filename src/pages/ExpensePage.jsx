import React, { useState, useEffect, useCallback } from "react";

import ExpenseAPI from "../API/ExpenseAPI";

export default function ExpensePage() {
  const [expenseAPI, setExpenseAPI] = useState([]);

  useEffect(() => {
    const getExpense = () => {
      ExpenseAPI.getExpense().then((res) => {
        console.log(res.data.message)
        setExpenseAPI(res.data.message);
      })
    }

    getExpense();
  }, []);

  return (
    <>
      <h1>This is an expense page!</h1>

      <div>
        {expenseAPI.map((data, index) => {
          return (
            <ul>
              <li>{data.expense_amount}</li>
              <li>{data.expense_description}</li>
            </ul>
          )
        })}
      </div>
    </>
  )
}