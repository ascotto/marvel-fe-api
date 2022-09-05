import { createContext, useReducer } from 'react'
import md5 from 'md5'
import { PRIVATE_KEY, PUBLIC_KEY } from '../../api/api.keys'

const timestamp = Date.now()

// GLOBAL PARAMS STATE
export const API_PARAMS_STATE = {
  apikey: PUBLIC_KEY,
  offset: 0,
  ts: timestamp,
  hash: md5(timestamp + PRIVATE_KEY + PUBLIC_KEY),
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
