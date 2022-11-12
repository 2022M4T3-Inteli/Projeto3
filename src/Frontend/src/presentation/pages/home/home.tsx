import React, { useState } from 'react'
import { Header, Navbar } from '../../components'
import './home.scss'
import HistoryIcon from '@mui/icons-material/History'
import CategoryIcon from '@mui/icons-material/Category'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'

const Home: React.FC = () => {
  return (
    <div id="home">
      <Header />
      <Navbar />
      <div className="container">
        <div className="row topSide">
          <div className="col">
            <p className='text'>Histórico</p>
            <HistoryIcon className="icon" />
          </div>
          <div className="col">
            <p className='text'>Categorias</p>
            <CategoryIcon className="icon" />
          </div>
        </div>
        <div className="row bottomSide">
          <div className="col location">
            <p className='text'>Localização</p>
            <TrackChangesIcon className="icon" />
          </div>
          <div className="col">
            <p className='text'>Tags</p>
            <SettingsRemoteIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home