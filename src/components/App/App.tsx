import { Button, Container, Typography, styled } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { userActions } from "../../store/actions/userActions"
import { getAuthStatus, getUserSelector } from "../../store/selectors"
import LoginForm from "../Login/Login"
import TodoList from "../TodoList/TodoList"
import type { IAction, IState, IUser } from "../../types"
import { ThunkDispatch } from "redux-thunk"

const AppContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    padding: '20px',
    height: '100vh',
    maxWidth: '100%',
    background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
    fontFamily: "'Montserrat', sans-serif",
    '& > h2': {
      fontFamily: 'inherit',
      fontSize: '3em',
      color: '#fafafa',
      textTransform: 'uppercase',
      textShadow: '2px 5px 5px rgba(84, 84, 84, 0.4)'
    }
  }
})

const ProfileContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '5px',
    borderRadius: '8px',
    backgroundColor: 'rgba(250, 250, 250, 0.3)',
    color: '#6988bf',
    fontFamily: 'Montserrat',
    '& h1': {
      fontFamily: 'inherit',
      fontSize: '1.2em'
    },
    '& h1:nth-of-type(2)': {
      textAlign: 'right',
      fontSize: '1.4em',
      flexGrow: '1'
    },
    '& button': {
      border: 'none',
      borderRadius: '6px',
      padding: '5px 10px',
      color: '#fafafa',
      fontFamily: 'inherit',
      backgroundColor: '#789cdb',
    },
  }
})

function App() {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()

  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if(token) {
      dispatch(userActions.setCurrentUser(token))
    }
  }, [])

  const isAuth = useSelector(getAuthStatus)
  const user = useSelector(getUserSelector) as IUser
  const date = new Date()

  const logOutHandler = () => {
    dispatch(userActions.logOut())
  }

  const dateStringCreator = () => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'full',
    }).format(date)
  }

  const responsiveGreeting = (date: Date) => {
    const hours = date.getHours()
    if(hours >= 4 && hours < 12) return 'Good morning'
    else if(hours >= 12 && hours < 16) return 'Good day'
    else if(hours >= 16 && hours < 24) return 'Good evening'
    else if(hours <= 0  && hours < 4) return 'Good night'
  }
  return (
    <AppContainer>
      {isAuth ?
      <>
        <ProfileContainer>
          <Typography variant="h1">Today is {dateStringCreator()}</Typography>
          <Typography variant="h1">{responsiveGreeting(date)}, {user.login} !</Typography>
          <Button onClick={logOutHandler}>Log out</Button>
        </ProfileContainer>
        <Typography variant="h2">Todo List</Typography>
        <TodoList />
      </>
      :
      <LoginForm/>}
    </AppContainer>
  )
}

export default App