import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'
import PropTypes from 'prop-types'

const MainBreadcrumbs = ({ selectedFilter }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        mt: 2,
        mb: 2,
      }}
    >
      <Typography>Home</Typography>
      {selectedFilter !== '' && (
        <Typography>
          {selectedFilter.charAt(0).toUpperCase() +
            selectedFilter.slice(1) +
            's'}
        </Typography>
      )}
    </Breadcrumbs>
  )
}

MainBreadcrumbs.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
}

export default MainBreadcrumbs
