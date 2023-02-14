import { useState, useEffect, useContext, useRef } from 'react'
import { urlWithParams } from './utility'
import Endpoints from './constants/endpoints'
import Grid from '@mui/material/Grid'
import TopBarMenu from './components/molecules/TopBarMenu'
import { Container } from '@mui/system'
import { GlobalApiParamsStore } from './store/params/params.store'
import MainBreadcrumbs from './components/molecules/MainBreadcrumbs'
import { useGetRefCallback } from './hooks/useGetRefCallback'
import { InfoModal } from './components/molecules/Modal'
import ComicCard from './components/molecules/ComicCard'
import { useFetchReducer } from './hooks/useFetchReducer'
import CircularLoading from './components/atoms/CircularLoading'
import { useApi } from './hooks/useComicsApi'

// remove duplicates function

const App = () => {
  // Api
  // const [comics, setComics] = useState({ results: [], total: null })
  // const { results, total } = comics

  const { apikey, offset, ts, hash, orderBy, format, setApiParams } =
    useContext(GlobalApiParamsStore)

  // const { isLoading, error, data: useFetch, sendRequest } = useFetchReducer()

  // Modal
  const [openModal, setOpenModal] = useState(false)
  const [comicInfo, setComicInfo] = useState({})
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    setComicInfo({})
  }

  const observer = useRef()
  const prevFormat = useRef()

  const { loading, error, results, total } = useApi(observer, prevFormat)

  // const apiUrl = Endpoints.Comics.Url.Base

  // const fetchURL = urlWithParams(apiUrl, {
  //   apikey,
  //   offset,
  //   ts,
  //   hash,
  //   format,
  //   orderBy,
  // })

  // const loadingOnFilterChange =
  //   results.length > 0 && prevFormat.current !== format

  // const ifObserver = typeof observer.current !== typeof 'undefined'

  // const loadingOnScroll =
  //   ifObserver &&
  //   prevFormat.current === format &&
  //   results.length + 20 < results.total

  // fetch data when parameters change
  // useEffect(() => {
  //   sendRequest({ url: fetchURL })

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [fetchURL])

  // derive data from the reducer to the local component stategit
  // useEffect(() => {
  //   if (!results) return

  //   // Handle first load, infinite load, and format change
  //   if (loadingOnScroll) {
  //     // infinite load
  //     const oldData = JSON.parse(JSON.stringify(comics.results))

  //     // remove duplicates
  //     const newData = results.filter(
  //       (result) => !oldData.some((old) => old.id === result.id),
  //     )

  //     setComics({ results: [...oldData, ...newData], total: comics.total })
  //   } else if (typeof observer.current === 'undefined') {
  //     // first load

  //     setComics({
  //       results: results,
  //       total: total,
  //     })
  //   } else if (loadingOnFilterChange) {
  //     // format change
  //     setComics({
  //       results: results,
  //       total: total,
  //     })

  //     // set prevFormat
  //     prevFormat.current = format
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [results, total])

  const loadMore = () => {
    if (loading.isLoading) return

    console.log('offset', offset)
    console.log('total', total)
    console.log('test', offset + 20 <= total)

    if (offset + 20 <= total) {
      console.log('trigger 1')
      setApiParams({ offset: offset + 20 })
    } else if (total - offset <= 20 && total - offset > 0) {
      console.log('trigger 2')
      setApiParams({ offset: offset + (total - offset) })
    }
  }

  const lastComicRef = useGetRefCallback(observer, loadMore, [
    loading.isLoading,
    results,
  ])

  const moreInfoHandler = (index) => {
    setComicInfo(results[index])
    handleOpenModal()
  }

  return (
    <>
      <TopBarMenu />

      {openModal && (
        <InfoModal
          open={openModal}
          comic={comicInfo}
          handleClose={handleCloseModal}
        />
      )}
      {!loading.isLoading && error && <div>There was an error...</div>}

      <Container maxWidth="xl">
        <MainBreadcrumbs selectedFilter={format} />

        {/* {(loading.isLoading || loading.loadingOnFilterChange) && (
          <CircularLoading />
        )} */}

        <Grid container spacing={'18px'} alignItems="stretch">
          {results.length > 0 &&
            !error &&
            (!loading.isLoading || !loading.loadingOnFilterChange) &&
            results.map((comic, index) => (
              <ComicCard
                key={comic.id.toString()}
                comic={comic}
                comicIndex={index}
                comicsTotal={results.length}
                lastComicRef={lastComicRef}
                moreInfoHandler={moreInfoHandler}
              />
            ))}
        </Grid>
        {loading.loadingOnScroll && <CircularLoading />}
      </Container>
    </>
  )
}

export default App
