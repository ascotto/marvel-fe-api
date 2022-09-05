import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Logo from '../atoms/Logo'

const DesktopMenu = ({ menuItems: menu }) => {
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
        {menu.map((menu) => (
          <Button
            key={menu.id}
            sx={{ my: 2, color: 'white', display: 'block' }}
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

export default DesktopMenu
