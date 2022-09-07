import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'

const fontFamily = [
  '"Quicksand"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(',')

const theme = createTheme({
  body: {
    overflowX: 'hidden',
    fontFamily: 'Quicksand, sans-serif',
  },

  typography: {
    fontFamily: fontFamily,
    allVariants: {
      fontFamily: fontFamily,
      fontWeight: 400,
    },
  },

  components: {
    MuiBreadcrumbs: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          fontSize: '1.125rem',

          '& .MuiTypography-root': {
            fontWeight: 'bold',
            fontSize: '1.125rem',
            color: '#828282',
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        fontFamily: 'Quicksand, sans-serif',
        root: {
          '&.menu-item': {
            fontWeight: 'bold',
            textTransform: 'None',
            fontSize: '1.125rem',

            '&.active': {
              color: '#DD2C2C',
            },
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          '&.menu-item': {
            fontWeight: 'bold',
            textTransform: 'None',
            fontSize: '1.125rem',
            color: '#FFFFFF',

            '&.active': {
              color: '#DD2C2C',
            },
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
