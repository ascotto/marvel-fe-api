import React, { useState, useEffect } from 'react'
import md5 from 'md5'
import { urlWithParams } from './utility/url'
import Endpoints from './constants/endpoints'
import { PUBLIC_KEY, PRIVATE_KEY } from './api/api.keys'
import { Grid } from '@mui/material'

const App = () => {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)

  const defaultResults = 20

  console.log(Endpoints.Comics.Url.Base)

  useEffect(() => {
    const fetchData = async () => {
      const timestamp = Date.now()
      const publicKey = PUBLIC_KEY
      const privateKey = PRIVATE_KEY

      const params = {
        apikey: publicKey,
        offset: 0,
        ts: timestamp,
        hash: md5(timestamp + privateKey + publicKey),

        // format: 'comic',
      }

      console.log(params)

      const apiUrl = Endpoints.Comics.Url.Base

      const fetchURL = urlWithParams(apiUrl, params)

      const results = await fetch(fetchURL)
        .then((res) => res.json())
        .then((res) => {
          return res.data
        })
        .then((res) => res.results)

      setData(results)
    }

    fetchData()
  }, [])

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
    <div className="App">
      <h1>Marvel API</h1>

      <Grid container spacing={2}>
        {data.length > 0 &&
          data.map((comic, index) => (
            <Grid item xs={2} key={comic.id.toString()}>
              <h3>{comic.title}</h3>
              {index < data.length - 1 ? <hr /> : ''}

              <p>
                {comic?.prices.length > 1
                  ? getLowestPrice(comic.prices)
                  : comic?.prices[0].price}
              </p>

              <img
                alt={comic.title + ' | Marvel Comics'}
                src={
                  comic.thumbnail.path +
                  '/portrait_fantastic.' +
                  comic.thumbnail.extension
                }
              />
              <button onClick={() => moreInfoHandler(index)}>More info</button>
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

export default App

// ;('http://i.annihil.us/u/prod/marvel/i/mg/9/50/4bc49463dad62')

// http://x.annihil.us/u/prod/marvel/i/mg/3/40/4bb4680432f73/portrait_fantastic.jpg
