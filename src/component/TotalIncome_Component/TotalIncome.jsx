import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment/moment";
import { AddIcon } from '@chakra-ui/icons'
import './TotalIncome.css';

import IncomeAPI from "../../API/IncomeAPI";
import AddIncomeButton from "../Add_Income_Button/AddIncomeButton";

export default function TotalIncome() {
  const { data } = useQuery({
    queryKey: ['totalIncomes'],
    queryFn: () => IncomeAPI.getIncomeByMonth()
  });

  return (
    <>
      <div className="TotalIncomeComponent">
        <p>Total Income Balance:</p>
        <p className="TotalIncomeText">{data}</p>
        {/* <button onClick={() => setIsOpen(true)}>
          <div className="AddIncomeIcon">
            <AddIcon />
          </div>
        </button> */}
      </div>
    </>
  )
}