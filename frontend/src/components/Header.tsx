import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'

const Header = () => {
  return (
    <AppBar sx={{ position: 'static',backgroundColor: 'transparent', boxShadow:'none' }}>{/* f4b41a */}
        <Toolbar sx={{display:'flex'}}>
            <Logo/>
        </Toolbar>
    </AppBar>
  )
}

export default Header