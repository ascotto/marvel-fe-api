import { useState, useEffect, useContext, useRef } from 'react'
import { urlWithParams, getLowestPrice } from './utility'
import Endpoints from './constants/endpoints'
import { CircularProgress, Grid, Paper } from '@mui/material'
import TopBarMenu from './components/molecules/TopBarMenu'
import { Container } from '@mui/system'
import { GlobalApiParamsState } from './store/params/params.state'
import MainBreadcrumbs from './components/molecules/MainBreadcrumbs'
import { useGetLastNodeCallback } from './hooks/useGetLastNodeCallback'

const App = () => {
  const [data, setData] = useState({ results: [], total: null })
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const observer = useRef()

  const { results, total } = data

  const { apikey, offset, ts, hash, orderBy, format, setApiParams } =
    useContext(GlobalApiParamsState)

  const prevformat = useRef()

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = Endpoints.Comics.Url.Base

      // show spinner
      setLoading(true)

      const fetchURL = urlWithParams(apiUrl, {
        apikey,
        offset,
        ts,
        hash,
        format,
        orderBy,
      })

      console.log('fetchURL', fetchURL.split('&'))

      // Fetch data from API
      const response = await fetch(fetchURL)
        .then((res) => res.json())
        .then((res) => {
          return res.data
        })
        .then((res) => res)

      // Handle first load, infinite load, and format change
      if (
        data.results.length === 0 &&
        typeof observer.current === 'undefined'
      ) {
        // first load
        setData({ results: response.results, total: response.total })
      } else if (
        data.results.length > 0 &&
        prevformat.current === format &&
        data.results.length + 20 <= data.total
      ) {
        // infinite load
        const oldData = JSON.parse(JSON.stringify(data.results))

        // remove duplicates
        const newData = response.results.filter(
          (result) => !oldData.some((old) => old.id === result.id),
        )

        setData({ results: [...oldData, ...newData], total: data.total })
      } else if (data.results.length > 0 && prevformat.current !== format) {
        // format change
        setData({ results: response.results, total: response.total })
      }

      // hide spinner
      setLoading(false)

      // set prevformat
      prevformat.current = format
    }

    // fetch data
    fetchData()
  }, [offset, format])

  useEffect(() => {
    console.log(data)
  }, [data])

  const loadMore = () => {
    if (loading) return

    if (offset + 20 <= total) {
      setApiParams({ offset: offset + 20 })
    } else if (total - offset <= 20 && total - offset > 0) {
      setApiParams({ offset: offset + (total - offset) })
    }
  }

  const lastComicRef = useGetLastNodeCallback(observer, loading, loadMore)

  const moreInfoHandler = (index) => {
    console.log(data[index])

    setOpen(true)
  }

  return (
    <>
      <TopBarMenu />
      {open}

      <Container maxWidth="xl">
        <MainBreadcrumbs selectedFilter={format} />

        <Grid
          container
          spacing={'18px'}
          alignItems="stretch"
          style={{ margin: '0 auto' }}
        >
          {results.length > 0 &&
            results.map((comic, index) => (
              <Grid
                item
                xs={6}
                xl={2}
                key={comic.id.toString()}
                sx={{ padding: 0 }}
              >
                <Paper
                  sx={{ height: '100%' }}
                  {...(index === data.results.length - 1
                    ? { ref: lastComicRef }
                    : null)}
                >
                  {comic.id.toString()}
                  <img
                    alt={comic.title + ' | Marvel Comics'}
                    src={
                      comic.thumbnail.path +
                      '/portrait_fantastic.' +
                      comic.thumbnail.extension
                    }
                  />

                  <h3>{comic.title}</h3>
                  <button onClick={() => moreInfoHandler(index)}>
                    More info
                  </button>
                  <p>
                    {comic?.prices.length > 1
                      ? getLowestPrice(comic.prices)
                      : comic?.prices[0].price}
                  </p>
                </Paper>
              </Grid>
            ))}
          {loading && (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 200,
              }}
            >
              <CircularProgress color="inherit" />
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default App
