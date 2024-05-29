import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment';
import { Button, Center } from '@chakra-ui/react';
import Table from 'react-bootstrap/Table';
// import {
//   TableContainer,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Divider
// } from '@chakra-ui/react';

import ExpenseAPI from "../../API/ExpenseAPI";
import { TableBody, TableHead } from "@material-ui/core";

export default function ExpenseList() {
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

  function deleteExpense(expenseId) {
    ExpenseAPI.removeExpense(expenseId).then(res => { console.log(res.data) }).catch(err => { console.log(err) });
    alert(res?.data?.response)
  }

  return (
    <>
      <h1>Expense section</h1>

      {/* <div className="ExpenseList"> */}
      {/* <Table size='lg' borderStyle='solid' borderColor='black'>
          <TableHead>
            <Tr>
              <Th>Expense Amount</Th>
              <Th>Description</Th>
            </Tr>
          </TableHead>
          <TableBody>
            {expenseAPI.map((data, index) => {
              return (

                <Tr>
                  <Td>{data.expense_amount}</Td>
                  <Td>{data.expense_description}</Td>
                </Tr>
                <p>{data.expense_amount}</p>
                <p>{data.expense_description}</p>
              )
            })}
          </TableBody>
        </Table> */}
      <Table striped bordered size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Income</th>
            <th>Description</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {expenseAPI.map((data, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{data.expense_amount}</td>
                <td>{data.expense_description}</td>
                <td>{moment(data.timestamp).format("D-M-Y h:m:sA")}</td>
                <td>
                  <Center>
                    <Button colorScheme='red' size='sm' className='DeleteIncomeButton' onClick={() => deleteExpense(data.id)}>Delete</Button>
                  </Center>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}