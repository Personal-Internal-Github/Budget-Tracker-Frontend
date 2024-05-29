import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
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
  // const [expenseAPI, setExpenseAPI] = useState([]);
  const queryClient = useQueryClient();
  const {data} = useQuery({
    queryKey: ['expenses'],
    queryFn: () => ExpenseAPI.getExpense(),
  });

  const {mutate, reset} = useMutation({
    mutationFn: (expenseId) =>  ExpenseAPI.removeExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses', 'totalExpenses'])
    }
  })

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
          {data?.map((expenseData, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{expenseData.expense_amount}</td>
                <td>{expenseData.expense_description}</td>
                <td>{moment(expenseData.timestamp).format("D-M-Y h:m:sA")}</td>
                <td>
                  <Center>
                    <Button colorScheme='red' size='sm' className='DeleteIncomeButton' onClick={() => {
                      mutate(expenseData.id)
                      reset();
                      }}>Delete</Button>
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