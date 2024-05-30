import React, { useState, useEffect, useCallback } from 'react';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Center } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons'
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
import './IncomeList.css';

import AddIncomeButton from '../Add_Income_Button/AddIncomeButton';
import IncomeAPI from '../../API/IncomeAPI';

export default function IncomeList() {
  const queryClient = useQueryClient();
  const { data, isFetching, isPending, fetchStatus, isFetched, isError } = useQuery({
    queryKey: ['incomes'],
    queryFn: () => IncomeAPI.getIncome()
  });

  const { mutate, reset } = useMutation({
    mutationFn: (incomeId) => IncomeAPI.deleteIncome(incomeId),
    onSuccess: () => {
      queryClient.invalidateQueries(['incomes'])
      queryClient.invalidateQueries(['totalIncomes'])
    }
  })

  return (
    <div className='IncomeView'>
      <div className='AddIncomeButtonView'>
        <h1 className='IncomeListTitle'>Income</h1>
        <AddIncomeButton />
      </div>

      <Table bordered size='md'>
        <thead>
          <tr className='TableRow'>
            <th style={{ width: '5dvw' }}>Entry #</th>
            <th style={{ width: '8dvw' }}>Date</th>
            <th style={{ width: '8dvw' }}>Time</th>
            <th style={{ width: '40dvw', textAlign: 'left' }}>Description</th>
            <th>Amount</th>
            <th>Delete Entry</th>
          </tr>
        </thead>
        <tbody>
          {(data === [] || data == ''|| isError || data == NaN) ?
            <tr className="TableRow">
              <td colSpan={6}>No Data!</td>
            </tr>
            : isFetched && data?.map((incomeData, index) => {
              return (
                <tr key={index} className="TableRow">
                  <td className='TableBodyNumber'>{index + 1}</td>
                  <td>{moment(incomeData.timestamp).format("D-MM-Y")}</td>
                  <td>{moment(incomeData.timestamp).format("H:mm:s")}</td>
                  <td style={{ textAlign: 'left' }}>{incomeData.income_description == null ? 'No Description' : incomeData?.income_description}</td>
                  <td>{new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'MYR'
                  }).format(incomeData.income).replace('MYR', '')}</td>
                  <td>
                    <Center>
                    <DeleteIcon onClick={() => {
                        mutate(incomeData.id)
                        reset();
                      }} className='DeleteIcon'/>
                      {/* <Button colorScheme='green' size='sm' className='DeleteIncomeButton' onClick={() => {
                        mutate(incomeData.id)
                        reset();
                      }}>Delete</Button> */}
                    </Center>
                  </td>
                </tr>
              )
            })}
          <tr className='TableAmountRow'>
            <td colSpan={4} style={{ textAlign: 'right' }}>Total</td>
            <td style={{textAlign: 'center'}}>{new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'MYR'
              /* maximumSignificantDigits: 2 */
            }).format(data?.map(incomeData => incomeData.income).reduce((prevValue, curValue) => prevValue + curValue, 0)).replace('MYR', '')}</td>
            <td />
          </tr>
        </tbody>
      </Table>
    </div >
  )
}