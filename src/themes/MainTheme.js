import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'

const theme = createTheme({
  typography: {
    fontFamily: 'Quicksand, sans-serif',
    fontWeight: 400,
    button: {},
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&.menu-item': {
            fontWeight: 'bold',
            textTransform: 'None',
            fontSize: '1.125rem',
          },
        },
      },
    },
  },
})

const MainTheme = ({ children }) => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CssBaseline>
  )
}

MainTheme.propTypes = {
  children: PropTypes.node.isRequired,
}

export default MainTheme
