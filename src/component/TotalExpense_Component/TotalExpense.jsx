import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AddIcon } from '@chakra-ui/icons'
import './TotalExpense.css'

import ExpenseAPI from "../../API/ExpenseAPI";
import AddExpenseButton from "../AddExpense_Component/AddExpenseButton";

export default function TotalExpense() {
  const {data} = useQuery({
    queryKey: ['totalExpenses'],
    queryFn: () => ExpenseAPI.getExpenseByMonth()
  });
  
  return (
    <>
      <div id='TotalExpense'>
        <button onClick={() => setIsOpen(true)}>
          <p>Total Expense Balance:</p>
          <p className="TotalExpenseText">{data}</p>
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