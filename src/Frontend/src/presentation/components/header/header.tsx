import React from 'react'
import './header.scss'

import Logo from '/src/assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';

const Header: React.FC = () => {
  const logout: Function = () => {
    window.location.href = '/'
  }

  const goToHome: Function = () => {
    window.location.href = '/home'
  }

  return (
    <div id="header">
      <div className="logoContainer">
      <img onClick={() => goToHome()} className="logo" src={Logo} alt="" />
      </div>
      <div className="logoutContainer">
        <LogoutIcon onClick={() => logout()} className='logout' />
      </div>
    </div>
  )
}

export default Header