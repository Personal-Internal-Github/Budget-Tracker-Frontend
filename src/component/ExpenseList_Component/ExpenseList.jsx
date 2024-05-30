import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { Button, Center } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
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
import AddExpenseButton from "../AddExpense_Component/AddExpenseButton";
import '../../App.css'

export default function ExpenseList() {
  // const [expenseAPI, setExpenseAPI] = useState([]);
  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => ExpenseAPI.getExpense(),
  });

  const { mutate, reset } = useMutation({
    mutationFn: (expenseId) => ExpenseAPI.removeExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries(['expenses'])
      queryClient.invalidateQueries(['totalExpenses'])
    }
  })

  return (
    <div>
      <div className="AddExpenseButtonView">
        <h1 className="ExpenseListTitle">Expenses</h1>
        <AddExpenseButton />
      </div>

      <Table bordered size='md' width={100}>
        <thead>
          <tr className="TableRow">
            <th style={{ width: '5dvw' }}>Entry #</th>
            <th style={{ width: '8dvw' }}>Date</th>
            <th style={{ width: '8dvw' }}>Time</th>
            <th style={{ width: '40dvw', textAlign: 'left' }}>Description</th>
            <th>Amount</th>
            <th>Delete Entry</th>
          </tr>
        </thead>
        <tbody>
          {(isPending || data == '' || data == NaN)
            ? <tr className="TableRow">
              <td colSpan={6}>No Data!</td>
            </tr>
            :
            data?.map((expenseData, index) => {
              return (
                <tr key={index} className="TableRow">
                  <td>{index + 1}</td>
                  <td>
                      {moment(expenseData.timestamp).format("D-MM-Y")}
                  </td>
                  <td>
                      {moment(expenseData.timestamp).format("H:mm:s")}
                  </td>
                  <td style={{ textAlign: 'left' }}>{expenseData.expense_description == null ? 'No Description' : expenseData.expense_description}</td>
                  <td>{new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'MYR'
                  }).format(expenseData.expense_amount).replace('MYR', '')}</td>
                  <td>
                    <Center>
                      <DeleteIcon onClick={() => {
                        mutate(expenseData.id)
                        reset();
                      }} className='DeleteIcon'/>
                      {/* <Button colorScheme='green' size='sm' className='DeleteIncomeButton' onClick={() => {
                        mutate(expenseData.id)
                        reset();
                      }}>Delete</Button> */}
                    </Center>
                  </td>
                </tr>
              )
            })}
          <tr className="TableAmountRow">
            <td colSpan={4} style={{ textAlign: 'right' }}>Total</td>
            <td style={{textAlign: 'center'}}>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'MYR'
              }).format(data?.map(expenseData => expenseData.expense_amount).reduce((prevValue, curValue) => prevValue + curValue, 0)).replace('MYR', '')}
            </td>
            <td />
          </tr>
        </tbody>
      </Table>
    </div>
  )
}