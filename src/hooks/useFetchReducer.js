import { useReducer, useCallback } from 'react'
import { debug } from '../config/environments'

const initialState = {
  isLoading: false,
  error: null,
  data: undefined,
}

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      debug() && console.log('%c FETCHING', 'color: cyan')
      return { ...state, isLoading: true }
    case 'FETCHED':
      debug() && console.log('%c FETCHED SUCCESS', 'color: lightgreen')
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case 'ERROR':
      debug() && console.log('%c FETCH ERROR', 'color: red')
      debug() && console.log(action)
      return { ...state, isLoading: false, error: action.payload }
    default:
      return state
  }
}

export const useFetchReducer = () => {
  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const sendRequest = useCallback(async (requestConfig) => {
    dispatch({ type: 'FETCHING' })

    const { url, method, headers, body } = requestConfig

    const fetchConfig = {
      ...requestConfig,
      method: method || 'GET',
      headers: headers || {},
      body: JSON.stringify(body) || null,
    }

    try {
      const response = await fetch(url, fetchConfig)

      if (!response.ok) {
        let error = response.status + ' - ' + response.statusText + ' '

        // if there is an error message in the response
        error += response?.message || ''
        throw new Error('Request failed: ' + error)
      }

      const data = await response.json()

      dispatch({ type: 'FETCHED', payload: data })
    } catch (err) {
      dispatch({ type: 'ERROR', payload: err.message })
    }
  }, [])

  return {
    isLoading: state.isLoading,
    error: state.error,
    data: state.data,
    sendRequest,
  }
}
