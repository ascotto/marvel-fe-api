import { useState, useEffect, useContext } from 'react'
import { urlWithParams } from './utility/url'
import Endpoints from './constants/endpoints'
import { CircularProgress, Grid, Paper } from '@mui/material'
import TopBarMenu from './components/molecules/TopBarMenu'
import { Container } from '@mui/system'
import { GlobalApiParamsState } from './store/params/params.state'

const App = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  //  const defaultResults = 20

  const { apikey, offset, ts, hash, format } = useContext(GlobalApiParamsState)

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = Endpoints.Comics.Url.Base

      setLoading(true)

      const fetchURL = urlWithParams(apiUrl, {
        apikey,
        offset,
        ts,
        hash,
        format,
      })

      const results = await fetch(fetchURL)
        .then((res) => res.json())
        .then((res) => {
          return res.data
        })
        .then((res) => res.results)

      setLoading(false)
      setData(results)
    }

    fetchData()
  }, [offset, format])

  console.log(data)

  // get lowest price from array of objects
  const getLowestPrice = (prices) => {
    const pricesArray = prices.map((price) => price.price)
    return Math.min(...pricesArray)
  }

  const moreInfoHandler = (index) => {
    console.log(data[index])

    setOpen(true)
  }

  return (
    <>
      <TopBarMenu />
      {open}
      <div className="App">
        <Container maxWidth="xl">
          <Grid
            container
            spacing={'18px'}
            alignItems="stretch"
            style={{ margin: '0 auto' }}
          >
            {loading && (
              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <CircularProgress color="inherit" />
              </Grid>
            )}

            {data.length > 0 &&
              !loading &&
              data.map((comic, index) => (
                <Grid item xs={6} xl={2} key={comic.id.toString()}>
                  <Paper sx={{ height: '100%' }}>
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
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default App
