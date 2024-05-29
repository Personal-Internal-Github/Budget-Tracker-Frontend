import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button
} from '@chakra-ui/react';

import IncomeAPI from '../../API/IncomeAPI';

export default function AddIncomeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [incomeValue, setIncomeValue] = useState(0);

  const addIncome = (incomeAmount) => {
    IncomeAPI.addIncome(incomeAmount).then(res => {
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
        Add Income
      </Button>

      <AlertDialog
        isOpen={isOpen}
        isCentered={true}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {/* <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add Income
            </AlertDialogHeader> */}

            <AlertDialogBody>
              <input type='number' onChange={(e) => setIncomeValue(e.target.value)} value={incomeValue} placeholder='Please enter your income amount'/>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme='blue' onClick={() => addIncome(incomeValue)} ml={3}>
                Add
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </div>
  )
}