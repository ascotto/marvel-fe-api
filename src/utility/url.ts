import { objectKeys } from '../types/index'

type QueryObject = {
  [key: string]: string | number
}

const formatQueryParams = (paramsObject: QueryObject): string =>
  objectKeys(paramsObject)
    .filter((key: string | number) => {
      const value = paramsObject[key]
      return (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      )
    })
    .map((key: string | number) => {
      const value = paramsObject[key]
      const encodedValue = Array.isArray(value)
        ? value.map(encodeURIComponent).join(',')
        : encodeURIComponent(value)
      return `${key}=${encodedValue}`
    })
    .join('&')

export const urlWithParams = (url: string, urlParamsObject: QueryObject) => {
  const urlParamsQueryString = formatQueryParams(urlParamsObject)
  return urlParamsQueryString ? `${url}?${urlParamsQueryString}` : url
}
