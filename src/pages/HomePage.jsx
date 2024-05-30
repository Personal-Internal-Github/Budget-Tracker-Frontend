import React, { useState } from "react";

import IncomeList from "../component/IncomeList_Component/IncomeList";
import ExpenseList from "../component/ExpenseList_Component/ExpenseList";

export default function HomePage() {

  return (
    <div id='mainView'>
        <IncomeList />
        <ExpenseList />
    </div>
  )
}