import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
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

import IncomeAPI from '../../API/IncomeAPI';

export default function IncomeList() {
  const queryClient = useQueryClient();
  const {data, isFetching, isPending, fetchStatus} = useQuery({
    queryKey: ['incomes'],
    queryFn: () => IncomeAPI.getIncome()
  });

  const {mutate, reset} = useMutation({
    mutationFn: (incomeId) => IncomeAPI.deleteIncome(incomeId),
    onSuccess: () => {
      queryClient.invalidateQueries(['incomes', 'totalIncomes'])
    }
  })

  return (
    <div>
      <h1>Income</h1>
      {/* <Table size='lg' borderStyle='solid' borderColor='black'>
          <Thead>
            <Tr>
              <Th>Income Amount</Th>
              <Th>Month</Th>
            </Tr>
          </Thead>
          <Tbody>
            {incomeAPI.map((data, index) => {
              return (

                <Tr>
                  <Td>{data.income}</Td>
                  <Td>{moment(data.timestamp).format("D-M-Y h:m:sA")}</Td>
                </Tr>
                <p>{data.expense_amount}</p>
                <p>{data.expense_description}</p>
              )
            })}
          </Tbody>
        </Table> */}
      <Table striped bordered size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Income</th>
            <th>Month</th>
          </tr>
        </thead>
        <tbody>
          {(isFetching === true || isPending === true || fetchStatus === 'fetching') ? 
            <p>Loading ....</p>
          : data?.map((incomeData, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{incomeData.income}</td>
                <td>{moment(incomeData.timestamp).format("D-M-Y h:m:sA")}</td>
                <td>
                  <Center>
                    <Button colorScheme='red' size='sm' className='DeleteIncomeButton' onClick={() => {
                      mutate(incomeData.id)
                      reset();
                      }}>Delete</Button>
                  </Center>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div >
  )
}