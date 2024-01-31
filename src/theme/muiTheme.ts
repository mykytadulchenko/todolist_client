import { createTheme } from '@mui/material'

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#6988bf',
        },
        root: {
          borderRadius: '8px',
        },
        input: {
          fontFamily: 'Montserrat',
          backgroundClip: 'text !important',
        },
      },
    },
  },
})

export default theme