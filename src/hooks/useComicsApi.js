import { useContext, useEffect, useRef, useState } from 'react'
import Endpoints from '../constants/endpoints'
import { useFetchReducer } from './useFetchReducer'
import { GlobalApiParamsStore } from '../store/params/params.store'
import { urlWithParams } from '../utility'

export const useComicsApi = (observer) => {
  const [comics, setComics] = useState({ results: [], total: null })
  const { results, total } = comics

  const { apikey, offset, ts, hash, orderBy, format } =
    useContext(GlobalApiParamsStore)

  const prevFormat = useRef(format)

  const fetchURL = urlWithParams(Endpoints.Comics.Url.Base, {
    apikey,
    offset,
    ts,
    hash,
    format,
    orderBy,
  })
  const { isLoading, error, data: useFetch, sendRequest } = useFetchReducer()

  const loadingOnFilterChange =
    results.length > 0 && prevFormat.current !== format

  const ifObserver = typeof observer.current !== typeof 'undefined'

  const loadingOnScroll =
    ifObserver &&
    prevFormat.current === format &&
    results.length + 20 < comics.total

  // fetch data when parameters change

  useEffect(() => {
    if (isLoading) return

    const abortController = new AbortController()

    sendRequest({ url: fetchURL, signal: abortController.signal })

    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchURL])

  // derive data from the reducer to the local component state
  useEffect(() => {
    if (!useFetch) return

    if (total !== null && loadingOnScroll) {
      // infinite load
      // console.log('loadingOnScroll')

      const oldData = JSON.parse(JSON.stringify(comics.results))

      // remove duplicates
      const newData = useFetch.data.results.filter(
        (result) => !oldData.some((old) => old.id === result.id),
      )

      setComics({
        results: [...oldData, ...newData],
        total: useFetch.data.total,
      })
    } else if (total === null && typeof observer.current === 'undefined') {
      // first load
      // console.log('first load')

      setComics({
        results: [...useFetch.data.results],
        total: useFetch.data.total,
      })
    } else if (loadingOnFilterChange) {
      // format change load
      // console.log('filter change')

      setComics({
        results: [...useFetch.data.results],
        total: useFetch.data.total,
      })

      // set prevFormat
      prevFormat.current = format
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useFetch])

  return {
    loadingStates: { isLoading, loadingOnScroll, loadingOnFilterChange },
    error,
    results,
    total,
  }
}
