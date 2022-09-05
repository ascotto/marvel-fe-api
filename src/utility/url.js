const formatQueryParams = (paramsObject) =>
  Object.keys(paramsObject)
    .filter((key) => {
      const value = paramsObject[key]
      return (
        value !== null &&
        value !== undefined &&
        value !== '' &&
        !(Array.isArray(value) && value.length === 0)
      )
    })
    .map((key) => {
      const value = paramsObject[key]
      const encodedValue = Array.isArray(value)
        ? value.map(encodeURIComponent).join(',')
        : encodeURIComponent(value)
      return `${key}=${encodedValue}`
    })
    .join('&')

export const urlWithParams = (url, urlParamsObject) => {
  const urlParamsQueryString = formatQueryParams(urlParamsObject)
  return urlParamsQueryString ? `${url}?${urlParamsQueryString}` : url
}
