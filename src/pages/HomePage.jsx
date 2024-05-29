import React, { useState } from "react";

import TotalBudgetBalance from "../component/TotalIncomeBudget_Component/TotalIncomeBudget";
import AddIncomeButton from "../component/Add_Income_Button/AddIncomeButton";
import AddExpenseButton from "../component/AddExpense_Component/AddExpenseButton";
import IncomeList from "../component/IncomeList_Component/IncomeList";
import ExpenseList from "../component/ExpenseList_Component/ExpenseList";
import TotalExpense from "../component/TotalExpense_Component/TotalExpense";
import TotalIncome from "../component/TotalIncome_Component/TotalIncome";

export default function HomePage() {

  return (
    <div id='mainView'>
        <IncomeList />
        <ExpenseList />
    </div>
  )
}