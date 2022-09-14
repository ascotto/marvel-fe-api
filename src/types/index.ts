export type MenuTS = {
  title: string
  id: string
}

interface ApiContextInterface {
  apikey: string
  offset: number
  ts: number
  hash: string
  format: string
  orderBy: string
  setApiParams: (params: object) => void
}

export type { ApiContextInterface }
