import React, { useState, useEffect } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  InputGroup,
  InputLeftAddon,
  Input
} from '@chakra-ui/react';

import IncomeAPI from '../../API/IncomeAPI';

export default function AddIncomeButton() {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [incomeValue, setIncomeValue] = useState(0);
  const [incomeDescription, setIncomeDescription] = useState(null);
  const { data, mutate, reset } = useMutation({
    mutationFn: ([incomeAmount, incomeDescription]) => IncomeAPI.addIncome(incomeAmount, incomeDescription),
    onSuccess: () => {
      queryClient.invalidateQueries(['incomes'])
      queryClient.invalidateQueries(['totalIncomes'])
    }
  })

  return (
    <>
      <Button colorScheme='blue' onClick={() => setIsOpen(true)}>
        Add Income
      </Button>

      <AlertDialog
        isOpen={isOpen}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Income
            </AlertDialogHeader>

            <AlertDialogBody>
              <InputGroup>
                <InputLeftAddon width={'11.1dvw'}>Income Amount</InputLeftAddon>
                <Input type='number' onChange={(e) => setIncomeValue(e.target.value)} value={incomeValue} placeholder='Please enter your income amount' required />
              </InputGroup>
            </AlertDialogBody>

            <AlertDialogBody>
              <InputGroup>
                <InputLeftAddon>Income Description</InputLeftAddon>
                <Input type='text' onChange={(e) => setIncomeDescription(e.target.value)} value={incomeDescription} placeholder='Enter description here' required />
              </InputGroup>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => {
                mutate([incomeValue, incomeDescription]);
                reset();
                setIsOpen(false);
              }} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}