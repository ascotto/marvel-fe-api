import  { useContext,useState } from 'react'
import Box from '@mui/material/Box'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { GlobalApiParamsStore } from '../../store/params/params.store'
import Logo from './Logo'

import { MenuTS } from '../../types'

const MobileMenu: React.FC<{menuItems: MenuTS[]}>  = ({ menuItems: menu }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const { format, setApiParams } = useContext(GlobalApiParamsStore)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleFilterComics = (menuId: string) => {
    setApiParams({ format: menuId, offset: 0 })
    setAnchorElNav(null)
  }



  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { xs: 'flex', md: 'none' },
        alignItems: 'center',
        height: '112px',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
        <Typography sx={{ pl: 1 }}>Filter Comics</Typography>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        className="mui-fixed"
        disableScrollLock={true}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          position: 'absolute',
          display: { xs: 'block', md: 'none' },
        }}
      >
        {menu.map((menu) => (
          <MenuItem key={menu.id} onClick={() => handleFilterComics(menu.id)}>
             <Typography
              className={['menu-item', format === menu.id ? 'active' : ''].join(
                ' ',
              )}
              textAlign="center"
            >
              {menu.title}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
      <Logo />
    </Box>
  )
}



export default MobileMenu
