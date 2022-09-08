import { PUBLIC_KEY } from '../../api/api.keys'
import { API_HASH, TIME_STAMP } from '../../api/api.hash'

// GLOBAL PARAMS STATE
export const API_PARAMS_STATE = {
  apikey: PUBLIC_KEY,
  offset: 0,
  ts: TIME_STAMP,
  hash: API_HASH,
  format: '',
  orderBy: '-modified',
}
