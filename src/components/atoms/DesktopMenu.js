import { useContext } from 'react'
import ProtpTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GlobalApiParamsState } from '../../store/params/params.state'
import Logo from './Logo'

const DesktopMenu = ({ menuItems: menu }) => {
  const { format, setApiParams } = useContext(GlobalApiParamsState)

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          height: '112px',
        }}
      >
        <Logo />
        {menu.map((menu, index) => (
          <Button
            className="menu-item"
            key={index}
            sx={{ my: 2, color: 'white', display: 'block' }}
            style={{ color: format === menu.id ? '#DD2C2C' : '#FFF' }}
            onClick={() => setApiParams({ format: menu.id, offset: 0 })}
            disableRipple
          >
            {menu.title}
          </Button>
        ))}
      </Box>
      <Box sx={{ flexGrow: 0 }}></Box>
    </>
  )
}

DesktopMenu.propTypes = {
  menuItems: ProtpTypes.array.isRequired,
}

export default DesktopMenu
