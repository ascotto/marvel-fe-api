import { useState, useContext, useRef } from 'react'
import Grid from '@mui/material/Grid'
import TopBarMenu from './components/molecules/TopBarMenu'
import { Container } from '@mui/system'
import { GlobalApiParamsStore } from './store/params/params.store'
import MainBreadcrumbs from './components/molecules/MainBreadcrumbs'
import { useGetRefCallback } from './hooks/useGetRefCallback'
import { InfoModal } from './components/molecules/Modal'
import ComicCard from './components/molecules/ComicCard'
import CircularLoading from './components/atoms/CircularLoading'
import { useComicsApi } from './hooks/useComicsApi'
import { Alert } from '@mui/material'

const App = () => {
  const { offset, format, setApiParams } = useContext(GlobalApiParamsStore)

  // Modal
  const [openModal, setOpenModal] = useState(false)
  const [comicInfo, setComicInfo] = useState({})
  const handleOpenModal = () => setOpenModal(true)
  const handleCloseModal = () => {
    setOpenModal(false)
    setComicInfo({})
  }

  const observer = useRef()

  const { loadingStates, error, results, total } = useComicsApi(observer)
  const { isLoading, loadingOnScroll, loadingOnFilterChange } = loadingStates

  const loadMore = () => {
    if (isLoading) return

    if (offset + 20 <= total) {
      setApiParams({ offset: offset + 20 })
    } else if (total - offset <= 20 && total - offset > 0) {
      setApiParams({ offset: offset + (total - offset) })
    }
  }

  const lastComicRef = useGetRefCallback(observer, loadMore, [
    isLoading,
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

      <Container maxWidth="xl">
        <MainBreadcrumbs selectedFilter={format} />

        {(isLoading || loadingOnFilterChange) && !error && <CircularLoading />}

        <Grid container spacing={'18px'} alignItems="stretch">
          {!isLoading && error && (
            <Grid item xs={12}>
              <Alert severity="error">
                Could not reach the server API. Please contact
                andrea@frontendbyte.com
              </Alert>
            </Grid>
          )}

          {results.length > 0 &&
            !error &&
            (!isLoading || !loadingOnFilterChange) &&
            results.map((comic, index) => (
              <ComicCard
                key={comic.id.toString()}
                comic={comic}
                comicIndex={index}
                comicsTotal={results.length}
                lastComicRef={
                  results.length + 20 <= total ? lastComicRef : undefined
                }
                moreInfoHandler={moreInfoHandler}
              />
            ))}
        </Grid>
        {loadingOnScroll && !error && <CircularLoading />}
      </Container>
    </>
  )
}

export default App
