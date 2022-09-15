
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import propTypes from 'prop-types'
import { displayPrice } from '../../utility'
import { Paper, IconButton, Grid } from '@mui/material'
import { Close } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { ComicDetails } from '../../types/comics'


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '100%', sm: '642px' },
  bgcolor: 'background.paper',
  border: '1px solid #1D1D1D',
  borderRadius: ' 5px',
  boxShadow: 24,
  p: 1.5,
}

const Img = styled('img')({
  margin: '0 auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '246px',
})



export const BasicModal: React.FC<{open: boolean, handleClose: () => void, comic: ComicDetails}> = ({ open, handleClose, comic }) => {
  const chars =
    comic.characters.items.length > 0
      ? comic.characters.items
          .map((character) => {
            return character.name
          })
          .join(', ')
      : 'No characters found'


  const creators =
    comic.creators.items.length > 0
      ? comic.creators.items
          .map((creator) => {
            return creator.name
          })
          .join(', ')
      : 'No creators found'


  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={modalStyle} className="modal-info">
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: '#DD2C2C',
            }}
          >
            <Close />
          </IconButton>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Img
                alt={comic.title + ' | Marvel Comics'}
                src={
                  comic.thumbnail.path +
                  '/portrait_fantastic.' +
                  comic.thumbnail.extension
                }
              />
            </Grid>
            <Grid item xs={12} sm container>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="modal-title"
              >
                {comic.title}
              </Typography>

              <ul>
                <li>
                  <strong>Year of release: </strong>
                  {new Date(comic.dates[0].date).getFullYear()}
                </li>
                <li>
                  <strong>Format: </strong>
                  {comic.format}
                </li>
                <li>
                  <strong>Pages: </strong>
                  {comic.pageCount}
                </li>
                <li>
                  <strong>Characters: </strong>
                  {chars}
                </li>
                <li>
                  <strong>Creators: </strong>
                  {creators}
                </li>
                <li>
                  <strong>DiamondCode: </strong>
                  {comic.diamondCode || 'N/A'}
                </li>
              </ul>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
              >
                <Grid item>
                  <span className="price-info">
                    {displayPrice(comic.prices)}
                  </span>
                </Grid>
                <Grid item>
                  <Button
                    className="close-modal"
                    disableFocusRipple
                    disableElevation
                    onClick={handleClose}
                  >
                    Close
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}




export const InfoModal: React.FC<{open: boolean,handleClose: () => void, comic: ComicDetails }> = ({ open, handleClose, comic }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BasicModal open={open} handleClose={handleClose} comic={comic} />,
        (document.getElementById('modal-root')) as HTMLElement,
      )}
    </>
  )
}