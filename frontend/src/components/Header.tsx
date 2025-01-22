import { AppBar, Toolbar } from '@mui/material'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavLinks from './shared/NavLinks'

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ position: 'static',backgroundColor: 'transparent', boxShadow:'none' }}>{/* f4b41a */}
        <Toolbar sx={{display:'flex'}}>
            <Logo/>
            <div>
              {auth?.isLoggedIn ? 
              <>
                <NavLinks bg='#00fffc' to='/chat' text='Go to Chat' textColor='black'/>
                <NavLinks bg='#51528f' to='/logout' text='Logout' textColor='white' onClick={auth.logout}/>
              </> :
              <>
                <NavLinks bg='#00fffc' to='/login' text='Login' textColor='black'/>
                <NavLinks bg='#51528f' to='/signup' text='Signup' textColor='white'/>
              </> }
            </div> 
        </Toolbar>
    </AppBar>
  )
}

export default Header