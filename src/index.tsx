import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StyledEngineProvider } from '@mui/material'
import { ApiParamsProvider } from './store/params/params.provider'
import MainTheme from './themes/MainTheme'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StyledEngineProvider injectFirst>
    <ApiParamsProvider>
      <MainTheme>
        <App />
      </MainTheme>
    </ApiParamsProvider>
  </StyledEngineProvider>,
)


