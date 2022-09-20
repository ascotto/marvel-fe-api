import { createContext } from 'react'
import { ApiContextInterface } from '../../types'

export const GlobalApiParamsStore = createContext<ApiContextInterface>(null!)

GlobalApiParamsStore.displayName = 'ApiParamsState'
