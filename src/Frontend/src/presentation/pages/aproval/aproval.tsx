import React from 'react'
import './aproval.scss'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const Aproval: React.FC = () => {
  return (
    <div id="aproval">
      <div className="logoutContainer">
        <Link to="/">
        <ArrowBackIcon className='logout' />
        </Link>
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