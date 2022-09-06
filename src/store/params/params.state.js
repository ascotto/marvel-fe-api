import { createContext, useReducer } from 'react'
import ProtpTypes from 'prop-types'
import { PUBLIC_KEY } from '../../api/api.keys'
import { API_HASH, TIME_STAMP } from '../../api/api.hash'

// GLOBAL PARAMS STATE
export const API_PARAMS_STATE = {
  apikey: PUBLIC_KEY,
  offset: 0,
  ts: TIME_STAMP,
  hash: API_HASH,
  format: '',
}

export const GlobalApiParamsState = createContext()
GlobalApiParamsState.displayName = 'ApiParamsState'

const ApiParamsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_API_PARAMS':
      const oldState = JSON.parse(JSON.stringify(state))

      const newState = {
        ...oldState,
        ...action.payload,
      }

      console.log(newState)

      return {
        ...oldState,
        ...action.payload,
      }
    default:
      return state
  }
}
export const ApiParamsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ApiParamsReducer, API_PARAMS_STATE)

  const value = {
    ...state,
    setApiParams: (params) => {
      dispatch({ type: 'SET_API_PARAMS', payload: params })
    },
  }

  return (
    <GlobalApiParamsState.Provider value={value}>
      {children}
    </GlobalApiParamsState.Provider>
  )
}

ApiParamsProvider.propTypes = {
  children: ProtpTypes.node.isRequired,
}
