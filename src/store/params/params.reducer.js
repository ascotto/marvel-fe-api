import {paramsActionTypes as actions} from './params.actions'


export const ApiParamsReducer = (state, action) => {
  switch (action.type) {
    case actions.SET_API_PARAMS:
      const oldState = JSON.parse(JSON.stringify(state))

      return {
        ...oldState,
        ...action.payload,
      }

    default:
      return state
  }
}
