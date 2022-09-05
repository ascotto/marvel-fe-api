import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import MobileMenu from '../atoms/MobileMenu'
import DesktopMenu from '../atoms/DesktopMenu'

const menu = [
  { id: 'all', title: 'All' },
  { id: 'comic', title: 'Comic' },
  { id: 'magazine', title: 'Magazine' },
  { id: 'digital-comic', title: 'Digital Comic' },
]

const TopBarMenu = () => {
  return (
    <AppBar
      position="static"
      sx={{ height: '112px', background: '#000000' }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileMenu menuItems={menu} />

          <DesktopMenu menuItems={menu} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default TopBarMenu
