import { Button, Container, styled } from '@mui/material'
import type { FC, MouseEvent } from 'react'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { ThunkDispatch } from 'redux-thunk'
import type { IAction, IState, IUser } from '../../types'
import type { IFiltersComponent } from '../../types/components'
import asyncItemActions, { itemActions } from '../../store/actions/itemActions'
import { getUserSelector } from '../../store/selectors'

const FooterContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%',
    padding: '10px',
    fontSize: '0.8em',
    color: '#fafafa',
    '& > button': {
      textDecoration: 'underline',
      '&.hidden': {
        transform: 'translateY(200%)'
      }
    },
    '& button': {
      padding: '0',
      minWidth: '0',
      border: 'none',
      background: 'none',
      fontFamily: 'inherit',
      fontSize: '1em',
      color: '#fafafa',
      textTransform: 'none',
      '&.active__btn': {
        padding: '0 3px',
        border: '1px solid #fafafa',
        borderRadius: '4px',
      },
      '&:hover': {
        background: 'none'
      }
    }
  }
})

const FiltersContainer = styled(Container)({
  '&.MuiContainer-root': {
    alignSelf: 'center',
    display: 'flex',
    gap: '10px',
    width: 'auto'
  }
})

const Filters: FC<IFiltersComponent> = ({activeCounter, isAnyFinished}) => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const user = useSelector(getUserSelector) as IUser
  const clearSelected = () => dispatch(asyncItemActions.processRemoveSelected(user as IUser))
  const changeFilter = (e: MouseEvent) => {
    if(active.current) active.current.classList.remove('active__btn')
    active.current = e.target as HTMLButtonElement
    dispatch(itemActions.setFilter(active.current.dataset.filter as string))
    active.current.classList.add('active__btn')
  }

  useEffect(() => {
    active.current!.classList.add('active__btn')
    if(!isAnyFinished) clearSelectedBtn.current!.classList.add('hidden')
    else clearSelectedBtn.current!.classList.remove('hidden')
  }, [isAnyFinished])

  const active = useRef<HTMLButtonElement | null>(null)
  const clearSelectedBtn = useRef<HTMLButtonElement | null>(null)

  return (
    <FooterContainer>
        <p>{`${activeCounter} tasks left`}</p>
        <FiltersContainer>
          <Button ref={active} data-filter="All" onClick={changeFilter}>All</Button>
          <Button data-filter="Active" onClick={changeFilter}>Active</Button>
          <Button data-filter="Finished" onClick={changeFilter}>Finished</Button>
        </FiltersContainer>
        <Button ref={clearSelectedBtn} onClick={clearSelected}>Clear completed</Button>
    </FooterContainer>
  )
}
export default Filters