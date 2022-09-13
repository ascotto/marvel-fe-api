import { useContext } from 'react'
import ProtpTypes from 'prop-types'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { GlobalApiParamsStore } from '../../store/params/params.store'
import Logo from './Logo'

const DesktopMenu = ({ menuItems: menu }) => {
  const { format, setApiParams } = useContext(GlobalApiParamsStore)

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
            className={['menu-item', format === menu.id ? 'active' : ''].join(
              ' ',
            )}
            key={index}
            sx={{ my: 2, color: 'white', display: 'block' }}
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
