import { paramsActionTypes as actions, Action } from './params.actions'
import { ApiContextInterface } from '../../types'


export const ApiParamsReducer = (state: ApiContextInterface, action: Action) => {
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
