import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from 'react-hook-form'
import styles from './SignupForm.module.css'
import { useMemo, type FC } from "react"
import type { ISignupForm } from "../../types/components"
import type { IAction, ISignup, IState } from "../../types"
import { useDispatch } from "react-redux"
import type { ThunkDispatch } from "redux-thunk"
import validationSignUpSchema from "../../yup/schemes/validationSignUp"
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

const SignupForm:FC<ISignupForm> = ({switchState, switchForm}) => {
  const dispatch = useDispatch<ThunkDispatch<IState, any, IAction>>()
  const rootClass = useMemo(() => switchState ? [styles.signup__form, styles.active] : [styles.signup__form], [switchState])
  const {register, handleSubmit, reset, formState: {errors}} = useForm<ISignup>({
    resolver: yupResolver(validationSignUpSchema)
  })
  const processSignUp: SubmitHandler<ISignup> = (data) => {
      dispatch(asyncUserActions.signUp(data))
      reset()
  }

  return (
    <form action="" className={rootClass.join(' ')} onSubmit={handleSubmit(processSignUp)} noValidate>
        <label>
        <StyledInput type="text" error={errors.login ? true : false} size="small" label="Login" {...register('login')}/>
        <p className={styles.error}>{errors.login?.message}</p>
        </label>
        <label>
        <StyledInput type="email" error={errors.email ? true : false} size="small" label="Email" {...register('email')}/>
        <p className={styles.error}>{errors.email?.message}</p>
        </label>
        <label>
        <StyledInput type="password" error={errors.password ? true : false} size="small" label="Password" {...register('password')}/>
        <p className={styles.error}>{errors.password?.message}</p>
        </label>
        <label>
        <StyledInput type="password" error={errors.passwordConfirm ? true : false} size="small" label="Confirm password" {...register('passwordConfirm')}/>
        <p className={styles.error}>{errors.passwordConfirm?.message}</p>
        </label>
        <StyledButton type="submit">Sign up</StyledButton>
        <p onClick={() => switchForm(false)}>...or sign in.</p>
    </form>
  )
}
export default SignupForm