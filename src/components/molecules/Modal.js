import ReactDOM from 'react-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import propTypes from 'prop-types'
import { getLowestPrice } from '../../utility'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #1D1D1D',
  borderRadius: ' 5px',
  boxShadow: 24,
  p: 1.5,
}
const getCharacters = (characters) => {
  return characters.map((character) => character.name).join(', ')
}

export const BasicModal = ({ open, handleClose, comic }) => {
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

  console.log('chars', comic.characters.items.length)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            alt={comic.title + ' | Marvel Comics'}
            src={
              comic.thumbnail.path +
              '/portrait_fantastic.' +
              comic.thumbnail.extension
            }
            style={{
              float: 'left',
              marginRight: '20px',
            }}
          />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            {comic.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <ul>
            <li>
              Year of release: {new Date(comic.dates[0].date).getFullYear()}
            </li>
            <li>Format: {comic.format}</li>
            <li>Pages: {comic.pageCount}</li>
            <li>Characters: {chars}</li>
            <li>Creators: {creators}</li>
            <li>DiamondCode: {comic.diamondCode}</li>
          </ul>
          <span>{getLowestPrice(comic.prices)} EUR</span>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  )
}

BasicModal.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  comic: propTypes.object.isRequired,
}

export const InfoModal = ({ open, handleClose, comic }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BasicModal open={open} handleClose={handleClose} comic={comic} />,
        document.getElementById('modal-root'),
      )}
    </>
  )
}

InfoModal.propTypes = {
  open: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  comic: propTypes.object.isRequired,
}
