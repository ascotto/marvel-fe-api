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

// Generic Object Keys
// returns an array of keys from an object with a generic type
// generic object keys
export const objectKeys = <Obj extends {}>(obj: Obj): (keyof Obj)[] => {
  return Object.keys(obj) as (keyof Obj)[]
}
