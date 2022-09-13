import { CircularProgress, Grid } from '@mui/material'
import propTypes from 'prop-types'

const CircularLoading = ({ label }) => {
  return (
    <Grid container justifyContent="center" alignItems="center">
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
        {label}
        <CircularProgress sx={{ color: '#DD2C2C' }} />
      </Grid>
    </Grid>
  )
}

CircularLoading.propTypes = {
  label: propTypes.string,
}

export default CircularLoading
