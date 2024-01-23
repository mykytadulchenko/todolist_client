import * as yup from 'yup'

const validationSignUpSchema = yup.object().shape({ 
    login: yup.string().required('Login is required!')
                      .min(4, 'Login must be at least 4 characters long!')
                      .max(16, 'Login must be 16 characters long or less!'),
    email: yup.string().required('Email is required!').matches(/^[\w-\.]{2,}@([\w-]{2,8}\.)[\w-]{2,6}$/, 'Enter valid email!'),
    password: yup.string().required('Password is required!')
                      .min(8, 'Password must be at least 8 characters long!')
                      .max(16, 'Password must be 16 characters long or less!'),
    passwordConfirm: yup.string().required('Password confirmation is required!')
                      .test('Confirm pass', 'Confirmation doesn`t match password!', function(value) {
                        return this.parent.password === value
                      })
  })

export default validationSignUpSchema