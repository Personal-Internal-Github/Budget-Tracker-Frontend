import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import { AddIcon } from '@chakra-ui/icons'
import './TotalIncome.css';

import IncomeAPI from "../../API/IncomeAPI";
import AddIncomeButton from "../Add_Income_Button/AddIncomeButton";

export default function TotalIncome() {
  const [totalIncomeByCurrentMonth, setTotalIncomeByMonth] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getTotalIncomeByMonth = () => {
      IncomeAPI.getIncomeByMonth().then(res => {
        console.log(res.data)
        setTotalIncomeByMonth(res.data.totalIncomeAmount[0])
      }).catch(err => err);
    }

    getTotalIncomeByMonth();
  }, [])
  return (
    <>
      <div className="TotalIncomeComponent">
        <button onClick={() => setIsOpen(true)}>
          <p>Total Income Balance:</p>
          <p className="TotalIncomeText">{totalIncomeByCurrentMonth}</p>
          <div className="AddIncomeIcon">
            <AddIcon />
          </div>
        </button>
      </div>
    </>
  )
}