import { useReducer } from 'react'
import { ApiParamsReducer } from './params.reducer'
import { API_PARAMS_STATE } from './params.state'
import { paramsActionTypes as actions } from './params.actions'
import { GlobalApiParamsStore } from './params.store'
import { ApiContextInterface } from '../../types'

export const ApiParamsProvider: React.FC<{children: JSX.Element}> = ({ children }) => {
  const [state, dispatch] = useReducer(ApiParamsReducer, API_PARAMS_STATE)

  const value: ApiContextInterface  = {
    ...state,
    setApiParams: (params: object)  => {
      dispatch({ type: actions.SET_API_PARAMS, payload: params })
    },
  }

  return (
    <GlobalApiParamsStore.Provider value={value}>
      {children}
    </GlobalApiParamsStore.Provider>
  )
}
