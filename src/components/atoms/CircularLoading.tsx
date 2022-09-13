import { CircularProgress, Grid } from '@mui/material'

const CircularLoading: React.FC<{label?: string}> = ({ label }) => {
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




export default CircularLoading
