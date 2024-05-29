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
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react';

import ExpenseAPI from '../../API/ExpenseAPI';
import '../../App.css';

export default function AddExpenseButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [expenseValue, setExpenseValue] = useState(0);
  const [expenseDescription, setExpenseDescription] = useState(null);
  const queryClient = useQueryClient();

  const {mutate, reset} = useMutation({
    mutationFn: ([expenseAmount, description]) => ExpenseAPI.addExpense(expenseAmount, description),
    onMutate: () => {
      queryClient.invalidateQueries({queryKey: ['expenses'], refetchType: 'all'})
      queryClient.invalidateQueries({queryKey: ['totalExpenses'], refetchType: 'all'})
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['expenses'], refetchType: 'all'})
      queryClient.invalidateQueries({queryKey: ['totalExpenses'], refetchType: 'all'})
    }
  })

  return (
    <>
      <Button colorScheme='red' onClick={() => setIsOpen(true)}>
        Add Expense
      </Button>

      <AlertDialog
        isOpen={isOpen}
        isCentered='true'
        style={'min-width: 90rem'}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Expense
            </AlertDialogHeader>

            <AlertDialogBody>
              <InputGroup>
                <InputLeftAddon>Expense Amount</InputLeftAddon>
                {/* <Input variant='outlined' type='number' onChange={(e) => setExpenseValue(e.target.value)} value={expenseValue} placeholder='Please enter your expense amount' required/> */}
                <Input variant='outlined' type='number' onChange={(e) => setExpenseValue(e.target.value)} value={expenseValue} required />
              </InputGroup>

              <InputGroup>
                <InputLeftAddon width={152}>Description</InputLeftAddon>
                <Input variant='outlined' type='text' onChange={(e) => setExpenseDescription(e.target.value)} value={expenseDescription} />
              </InputGroup>
              {/* <Input variant='outlined' type='text' onChange={(e) => setExpenseDescription(e.target.value)} value={expenseDescription} placeholder='Please enter your expense description' /> */}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => {
                mutate([expenseValue, expenseDescription])
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