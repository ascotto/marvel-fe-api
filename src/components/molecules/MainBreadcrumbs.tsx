import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { Breadcrumbs, Typography } from '@mui/material'

const MainBreadcrumbs: React.FC<{ selectedFilter: string}>  = ({ selectedFilter }) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      sx={{
        mt: 2.5,
        mb: 2.5,
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

export default MainBreadcrumbs
