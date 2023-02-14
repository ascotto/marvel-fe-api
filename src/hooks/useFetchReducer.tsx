import { useReducer, useCallback } from 'react'
import { debug } from '../config/environments'

type Action = {
  type: string
  payload?: any
}

interface FetchState {
  isLoading: boolean
  data: any
  error: any
}

const initialState: FetchState = {
  isLoading: false,
  error: null,
  data: undefined,
}

const fetchReducer = (state: FetchState, action: Action) => {
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

  const sendRequest = useCallback(async (requestConfig: any) => {
    dispatch({ type: 'FETCHING' })

    const { url, method, headers, body } = requestConfig

    const fetchConfig = {
      // ...requestConfig,
      method: method || 'GET',
      headers: headers || {},
      body: JSON.stringify(body) || null,
    }

    try {
      // TODO - add types for response
      const response: any = await fetch(url, fetchConfig)

      if (!response.ok) {
        let error = response.status + ' - ' + response.statusText + ' '

        error += response?.message || ''
        throw new Error('Request failed: ' + error)
      }

      const data = await response.json()

      dispatch({ type: 'FETCHED', payload: data })
    } catch (err: any) {
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


/* Write a function that determines whether the left or right branch of the tree is larger. The size of each branch is the sum of the node values. The function should return the string 
*/

// Write a function 


// const solution = (arr:[]) => {
//   // Type your solution here 
  
//    if(arr.length === 0) return "";
  
//   let leftSum = 0;
//   let rightSum = 0;
  
//   leftSum = getTreeSum(arr,left);
//   rightSum = getTreeSum(arr,right);

//   if(leftSum > rightSum) return "Left";
//   else if (leftSum < rightSum) return "Right";
//   return "";
  
// };


// const getTreeSum=(arr, i)=>{
// if(i> arr.length-1 || arr[i] === -1) return 0;
  
//   let leftChild = 2*i+1;
//   let rightChild = 2*i+2;
  
//   let sum = 0;
//   if(i <arr.length){
//       sum = arr[i] +getTreeSum(arr,leftChild) +getTreeSum(arr,rightChild);
//   }
//   return sum;

// }
