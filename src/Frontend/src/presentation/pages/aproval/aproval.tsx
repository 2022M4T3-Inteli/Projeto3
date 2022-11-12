import React from 'react'
import './aproval.scss'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Aproval: React.FC = () => {
  const logout: Function = () => {
    window.location.href = '/'
  }

  return (
    <div id="aproval">
      <div className="logoutContainer">
        <ArrowBackIcon onClick={() => logout()} className='logout' />
      </div>
      <div className="imageContainer">
        <WarningAmberIcon className='image' />
      </div>
      <div className="message">
        Seu acesso ainda não foi aprovado
      </div>
    </div>
  )
}

export default Aproval