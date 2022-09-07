import { Button, Paper, Typography, Grid } from '@mui/material'
import propTypes from 'prop-types'
import { getLowestPrice } from '../../utility'

const ComicCard = ({
  comic,
  comicIndex,
  comicsTotal,
  lastComicRef,
  moreInfoHandler,
}) => {
  const displaPrice = (prices) => {
    const price = getLowestPrice(prices)

    if (prices[0].price === 0) {
      return 'N/A'
    } else {
      return `${price} €`
    }
  }

  return (
    <Grid item xs={6} xl={2} key={comic.id.toString()} sx={{ padding: 0 }}>
      <Paper
        className="comic-card"
        elevation={0}
        {...(comicIndex === comicsTotal - 1 ? { ref: lastComicRef } : null)}
      >
        <img
          alt={comic.title + ' | Marvel Comics'}
          className={'comic-image'}
          src={
            comic.thumbnail.path +
            '/portrait_fantastic.' +
            comic.thumbnail.extension
          }
        />

        <Typography
          variant="h3"
          textAlign="center"
          className="card-title"
          gutterBottom
        >
          {comic.title}
        </Typography>

        <Typography
          variant="subtitle2"
          textAlign="center"
          className="price-info"
          gutterBottom
        >
          {displaPrice(comic.prices)}
        </Typography>

        <Button
          className="more-info"
          variant="contained"
          disableElevation
          onClick={() => moreInfoHandler(comicIndex)}
        >
          More info
        </Button>
      </Paper>
    </Grid>
  )
}

ComicCard.propTypes = {
  comic: propTypes.object.isRequired,
  comicIndex: propTypes.number.isRequired,
  comicsTotal: propTypes.number.isRequired,
  lastComicRef: propTypes.func,
  moreInfoHandler: propTypes.func.isRequired,
}

export default ComicCard
