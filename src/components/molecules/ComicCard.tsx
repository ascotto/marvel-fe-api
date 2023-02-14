import { Button, Paper, Typography, Fade, Grid } from '@mui/material'
import { ElementType } from 'react'
import { displayPrice } from '../../utility'


type Comic ={
  title: string
  id: string,
  thumbnail: {
    path: string,
    extension: string
  },
  prices: []
}

// TODO: fix type any for lastComicRef

const ComicCard: React.FC<{comic: Comic, comicIndex: number, comicsTotal: number, lastComicRef: any, moreInfoHandler: Function    
}> = ({
  comic,
  comicIndex,
  comicsTotal,
  lastComicRef,
  moreInfoHandler,
}) => {


  const passRef = comicIndex === comicsTotal - 1 ? lastComicRef : null;

  return (
    <Grid
      item
      xs={6}
      sm={4}
      md={3}
      xl={2}
      key={comic.id.toString()}
      sx={{ padding: 0 }}
    >
      <Fade in unmountOnExit timeout={500}>
        <Paper
          className="comic-card"
          elevation={0}
          ref={passRef}

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
            {displayPrice(comic.prices)}
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
      </Fade>
    </Grid>
  )
}




export default ComicCard
