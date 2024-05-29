import React, { useState, useEffect } from 'react';
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
  const [expenseValue, setExpenseValue] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const addExpense = (expenseValue, expenseDescription) => {
    ExpenseAPI.addExpense(expenseValue, expenseDescription).then(res => {
      console.log(res);
      setIsOpen(false);
    }).catch(err => err);
  }

  // useEffect(() => {
  //   c
  // });

  return (
    <div>
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
                <InputLeftAddon>Description</InputLeftAddon>
                <Input variant='outlined' type='text' onChange={(e) => setExpenseDescription(e.target.value)} value={expenseDescription} />
              </InputGroup>
              {/* <Input variant='outlined' type='text' onChange={(e) => setExpenseDescription(e.target.value)} value={expenseDescription} placeholder='Please enter your expense description' /> */}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => addExpense(expenseValue, expenseDescription)} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}