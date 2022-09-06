import md5 from 'md5'
import { PUBLIC_KEY, PRIVATE_KEY } from './api.keys'

export const TIME_STAMP = Date.now()

export const API_HASH = md5(TIME_STAMP + PRIVATE_KEY + PUBLIC_KEY)
