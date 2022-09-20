import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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
  typography: {
    fontFamily: fontFamily,
    allVariants: {
      fontFamily: fontFamily,
      fontWeight: 400,
    },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          '&.comic-card': {
            border: '2px solid #1D1D1D',
            borderaRadius: '5px',
            padding: '12px',
            height: '100%',

            '& .comic-image': {
              maxWidth: '100%',
              height: '242px',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: '1rem',
            },

            '& .card-title': {
              fontWeight: 700,
              color: '#1D1D1D',
              fontSize: '0.9375rem',
              lineHeight: '1.1875rem',
              minHeight: '2.375rem',
            },

            '& .price-info': {
              fontSize: '1.1875rem',
              fontWeight: 700,
              color: '#1D1D1D',
            },

            '& .more-info': {
              fontWeight: 700,
              textTransform: 'none',
              display: 'block',
              margin: '0 auto',
              borderaRadius: '5px',
              fontSize: '1.0625rem',
              padding: '0.25rem 2rem',
              backgroundColor: '#DD2C2C',
            },
          },

          '&.modal-info': {
            position: 'relative',

            '& strong': {
              color: '#1D1D1D',
            },

            '& .modal-title': {
              fontWeight: 700,
              fontSize: '1.0625rem',
              color: '#1D1D1D',
            },

            '& ul': {
              padding: 0,
              listStyle: 'none',
              fontWeight: 400,
              fontSize: '0.9375rem',

              '& li': {
                lineHeight: '1.5625rem',
              },
            },

            '& .price-info': {
              fontSize: '1.1875rem',
              fontWeight: 700,
              color: '#1D1D1D',
            },

            '& .close-modal': {
              float: 'right',
              color: '#FFFFFF',
              fontWeight: 700,
              textTransform: 'none',
              borderaRadius: '5px',
              fontSize: '1.0625rem',
              padding: '0.25rem 2rem',
              backgroundColor: '#DD2C2C',
            },
          },
        },
      },
    },

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
        root: {
          fontFamily: 'Quicksand, sans-serif',

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
            marginLeft: '60px',

            '&.active': {
              color: '#DD2C2C',
            },
          },
        },
      },
    },
  },
})

const MainTheme: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <CssBaseline>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CssBaseline>
  )
}

export default MainTheme
