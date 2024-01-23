import { Button, Container, TableCell, TableRow, TextField, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IState, IUser } from '../../types'
import asyncItemActions from '../../store/actions/itemActions'
import { getUserSelector, selectAllSelector } from '../../store/selectors'

const OuterContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    padding: '10px 0'
  }
})

const ControlsContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    gap: '5px',
    padding: 0,
    '& button': {
      minWidth: '0',
      padding: '0 10px',
      border: 'none',
      background: 'none',
      fontSize: 'inherit',
      color: '#6988bf',
      cursor: 'pointer'
    }
  }
})

const InputTask = styled(TextField)({
  '&': {
    width: '100%',
  },
  '& .MuiInputBase-root': {
    borderRadius:' 8px',
    overflow: 'hidden',
    '& input': {
      padding: '10px',
      fontFamily: 'Montserrat',
      backgroundColor: 'rgba(220, 220, 220, 0.5)',
      transition: 'background-color 0.6s'
    },
    '& input:focus': {
      backgroundColor: '#fafafa'
    }
  },
  '.MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6988bf',
    },
    '&:hover fieldset': {
      borderColor: '#6988bf',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6988bf', 
    },
  }
})
  

const Controls:FC = () => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const user = useSelector(getUserSelector) as IUser
  const [value, setValue] = useState('')
  const selectAll = useSelector(selectAllSelector)

  const addItem = (e: KeyboardEvent) => {
    if(e.key !== 'Enter') return
    dispatch(asyncItemActions.addNewItem(user as IUser, value))
    setValue('')
  }
  const selectAllHandler = () => {
    dispatch(asyncItemActions.processSelectAll(user as IUser, selectAll))
  }

  return (
    <OuterContainer>
      <ControlsContainer>
        <Button onClick={selectAllHandler}>
          <i className="fa-solid fa-check-double fa-lg"></i>
        </Button>
        <InputTask type="text" size="small" placeholder='Input task...' value={value} onChange={(e) => setValue(e.target.value)} onKeyUp={addItem}/>
      </ControlsContainer>
    </OuterContainer>
  )
}
export default Controls