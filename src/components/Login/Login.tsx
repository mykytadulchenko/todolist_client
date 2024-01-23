import { Container, styled } from '@mui/material'
import type { FC } from 'react'
import { useState } from 'react'
import SigninForm from '../SigninForm/SigninForm'
import SignupForm from '../SignupForm/SignupForm'

const LoginContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '10px',
    height: '100%',
    width: '100%',
    maxWidth: '600px'
  }
})

const TitleContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'rgb(233, 233, 233)',
    '& p': {
      textAlign: 'center'
    }
  }
})

const FormContainer = styled(Container)({
  '&.MuiContainer-root': {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    padding: '0',
    minHeight: '340px',
    borderRadius: '16px',
    backgroundColor: 'rgba(250, 250, 250, 0.2)',
    backdropFilter: 'blur(20px)',
    boxShadow: '0 10px 20px 10px rgba(84, 84, 84, 0.1)',
    overflow: 'hidden'
  }
})

const Login:FC = () => {
  const [isFormSwitched, setFormSwitched] = useState(false)
  return (
    <LoginContainer>
      <TitleContainer >
        <h1>Welcome!</h1>
        <p>Authorize to get access to all features!</p>
      </TitleContainer>
      <FormContainer>
          <SigninForm switchState={isFormSwitched} switchForm={setFormSwitched}/>
          <SignupForm switchState={isFormSwitched} switchForm={setFormSwitched}/>
        </FormContainer>
    </LoginContainer>
  )
}

export default Login