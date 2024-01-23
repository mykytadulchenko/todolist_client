import { useMemo, type FC } from "react"
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from "redux-thunk"
import { IAction, ISignin, IState } from "../../types"
import type { ISigninForm } from "../../types/components"
import styles from './SigninForm.module.css'
import asyncUserActions from "../../store/actions/userActions"
import { Button, TextField, styled } from "@mui/material"

const StyledInput = styled(TextField)({
  '& .MuiInputBase-root': {
    borderRadius:' 8px',
  },
  '& .MuiInputBase-input': {
    fontFamily: 'Montserrat',
    backgroundClip: 'text !important'
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
  },
  '.MuiInputLabel-root': {
    color: '#6988bf',
    fontFamily: 'inherit',
    '&.Mui-focused': {
      color: '#6988bf'
    }
  }
})

const StyledButton = styled(Button)({
  '&.MuiButton-root': {
    alignSelf: 'center',
    color: '#6988bf',
    fontFamily: 'inherit',
    backgroundColor: "rgba(250, 250, 250, 0.3)",
    '&:hover': {
      backgroundColor: "rgba(250, 250, 250, 0.5)"
    }
  }
})

const SigninForm:FC<ISigninForm> = ({switchState, switchForm}) => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const {handleSubmit, register, reset} = useForm<ISignin>()
  const rootClass = useMemo(() => switchState ? [styles.login__form, styles.active] : [styles.login__form], [switchState])
  const processSignIn:SubmitHandler<ISignin> = (data) => {
    dispatch(asyncUserActions.signIn(data))
    reset()
  }
  return (
    <form action="" className={rootClass.join(' ')} onSubmit={handleSubmit(processSignIn)}>
        <StyledInput label="Login" size="small" {...register('login')}/>
        <StyledInput type="password" label="Password" size="small" {...register('password')}/>
        <StyledButton type="submit">Sign in</StyledButton>
        <p onClick={() => switchForm(true)}>...or sign up.</p>
    </form>
  )
}
export default SigninForm