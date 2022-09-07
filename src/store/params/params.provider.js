import { useReducer } from 'react'
import ProtpTypes from 'prop-types'
import { ApiParamsReducer } from './params.reducer'
import { API_PARAMS_STATE } from './params.state'
import { paramsActionTypes as actions } from './params.actions'
import { GlobalApiParamsStore } from './params.store'

export const ApiParamsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApiParamsReducer, API_PARAMS_STATE)

  const value = {
    ...state,
    setApiParams: (params) => {
      dispatch({ type: actions.SET_API_PARAMS, payload: params })
    },
  }

  return (
    <GlobalApiParamsStore.Provider value={value}>
      {children}
    </GlobalApiParamsStore.Provider>
  )
}

ApiParamsProvider.propTypes = {
  children: ProtpTypes.node.isRequired,
}
