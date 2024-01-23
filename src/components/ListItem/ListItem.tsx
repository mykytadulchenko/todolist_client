import { Button, Checkbox, Container, ListItem as MUIListItem, TableCell, TableRow, TextField, Typography, styled } from '@mui/material'
import type { FC, KeyboardEvent } from 'react'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IListItem, IState, IUser } from "../../types"
import type { IListItemComponent } from "../../types/components"
import asyncItemActions from '../../store/actions/itemActions'
import { getUserSelector } from '../../store/selectors'

const StyledTableRow = styled(TableRow)({
  '&.MuiTableRow-root': {
    borderRadius: '8px',
    boxShadow: '0 2px 5px 2px rgba(91, 91, 91, 0.1)',
    fontFamily: 'Montserrat',
  }
})

const StyledTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    padding: '10px',
    border: 'none',
    height: '46px',
    '&:nth-of-type(2)': {
      padding: '10px 0',
      width: '100%'
    },
    '& p': {
      fontSize: '1.2em',
      fontFamily: 'Montserrat',
      color: '#fafafa',
      userSelect: 'none'
    },
    '& p.finished': {
      textDecoration: 'line-through'
    },
    '& button': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0',
      minWidth: '13px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      opacity: '0',
      transition: 'opacity 0.3s',
      '& i': {
        color: '#ad0000'
      }
    },
    '&:hover button': {
      opacity: '1'
    }
  }
})

const StyledCheckbox = styled(Checkbox)({
  '&.MuiCheckbox-root': {
    padding: '0',
    minWidth: '18px',
    '& .MuiSvgIcon-root': {
      fill: '#6988bf',
      width: '100%',
      height: '100%'
    }
  }
})

const EditTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    padding: '9px',
    width: '100%',
    border: 'none',
    height: '46px'
  }
})

const StyledInput = styled(TextField)({
  '&': {
    width: '100%',
  },
  '& .MuiInputBase-root': {
    border: 'none',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    '& input': {
      padding: '2px 10px',
      color: '#fafafa'
    }
  },
  '.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#6988bf', 
    },
  }
})

const ListItem:FC<IListItemComponent> = ({ itemData }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(itemData.value)
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()

  const checkItem = (item: IListItem) => dispatch(asyncItemActions.editItem({...item, completed: !item.completed}))
  const removeItem = (item: IListItem) => dispatch(asyncItemActions.removeItem(item))
  const edit = (e: KeyboardEvent) => {
    if (e.key !== "Enter") return
    dispatch(asyncItemActions.editItem({...itemData, value}))
    setIsEditing(false)
  }

  return (
   <StyledTableRow>
      {isEditing ? (
        <EditTableCell colSpan={3}>
          <StyledInput
            type="text"
            autoFocus
            value={value}
            onKeyUp={edit}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => setIsEditing(false)}
          />
        </EditTableCell>
      ) : (
        <>
          <StyledTableCell>
            <StyledCheckbox checked={itemData.completed} onChange={() => checkItem(itemData)}/>
          </StyledTableCell>
          <StyledTableCell>
            <Typography variant='body1' className={itemData.completed ? 'finished' : ''} onDoubleClick={() => setIsEditing(true)}>{itemData.value}</Typography>
          </StyledTableCell>
          <StyledTableCell>
            <Button onClick={() => removeItem(itemData)}>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </Button>
          </StyledTableCell>
        </>
      )}
    </StyledTableRow>
  )
}
export default ListItem
